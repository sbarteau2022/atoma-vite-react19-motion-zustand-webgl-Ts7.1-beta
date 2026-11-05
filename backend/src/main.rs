//! Loopback governor scaffold for the Atoma site.
//!
//! Binds `127.0.0.1:4810`. SurrealDB is probed on `:8000` only.
//! oMLX and SGLang are dead paths and are never probed.
//! Nothing here issues a mission, writes a memory, or paints a control green.

use std::time::Duration;

use axum::extract::DefaultBodyLimit;
use axum::http::StatusCode;
use axum::routing::{get, post};
use axum::{Json, Router};
use serde::Deserialize;
use serde_json::{json, Value};
use tokio::io::{AsyncReadExt, AsyncWriteExt};
use tokio::net::TcpStream;
use tower_http::limit::RequestBodyLimitLayer;
use tower_http::timeout::TimeoutLayer;

const BIND: &str = "127.0.0.1:4810";
const BODY_CAP: usize = 256 * 1024;

struct Dep {
    name: &'static str,
    up: bool,
    detail: String,
}

fn dep(name: &'static str, up: bool, detail: impl Into<String>) -> Dep {
    Dep {
        name,
        up,
        detail: detail.into(),
    }
}

fn dep_json(rows: &[Dep]) -> Value {
    Value::Array(
        rows.iter()
            .map(|row| {
                json!({
                    "name": row.name,
                    "up": row.up,
                    "detail": row.detail,
                })
            })
            .collect(),
    )
}

/// The twelve statutory ids. A scaffold has no live proof, so none are satisfied.
fn controls() -> Value {
    const RULES: &[(&str, &str)] = &[
        ("GDPR-ART-17", "Right to erasure"),
        ("GDPR-ART-22", "Human oversight of automated decisions"),
        ("GDPR-ART-25", "Protection by design"),
        ("AIA-ART-09", "Risk management"),
        ("AIA-ART-12", "Tamper-evident logging"),
        ("AIA-ART-14", "Human oversight"),
        ("AIA-ART-15", "Accuracy and robustness"),
        ("SOC2-CC6", "Logical access"),
        ("SOC2-PI1", "Processing integrity"),
        ("NIST-CSF-PR", "Protect"),
        ("NIST-CSF-RC", "Recover"),
        ("ISO-42001-A6", "Impact and readiness"),
    ];
    json!(RULES
        .iter()
        .map(|(id, title)| json!({
            "id": id,
            "title": title,
            "satisfied": false,
            "evidence": "scaffold: no live proof"
        }))
        .collect::<Vec<_>>())
}

fn why(path: &str, cause: &str) -> Value {
    json!({
        "error": cause,
        "why_receipt": { "evidenced_cause": cause, "path": path }
    })
}

async fn probe_http(host: &str, port: u16, path: &str) -> (bool, String) {
    let addr = format!("{host}:{port}");
    let connect = tokio::time::timeout(Duration::from_millis(400), TcpStream::connect(&addr)).await;
    let mut stream = match connect {
        Ok(Ok(stream)) => stream,
        Ok(Err(err)) => return (false, err.to_string()),
        Err(_) => return (false, "probe timed out".into()),
    };
    let request = format!("GET {path} HTTP/1.1\r\nHost: {host}\r\nConnection: close\r\n\r\n");
    if stream.write_all(request.as_bytes()).await.is_err() {
        return (false, "probe write failed".into());
    }
    let mut buf = [0u8; 64];
    match tokio::time::timeout(Duration::from_millis(400), stream.read(&mut buf)).await {
        Ok(Ok(n)) if n > 0 => {
            let head = String::from_utf8_lossy(&buf[..n]);
            let ok = head.contains(" 200 ") || head.contains(" 204 ");
            (ok, head.lines().next().unwrap_or("no status").to_string())
        }
        _ => (false, "probe read failed".into()),
    }
}

async fn dependencies() -> Vec<Dep> {
    let (surreal_up, surreal_detail) = probe_http("127.0.0.1", 8000, "/health").await;
    let (qdrant_up, qdrant_detail) = probe_http("127.0.0.1", 6333, "/").await;
    vec![
        dep(
            "surrealdb",
            surreal_up,
            format!("127.0.0.1:8000 {surreal_detail}"),
        ),
        dep(
            "qdrant",
            qdrant_up,
            format!("127.0.0.1:6333 {qdrant_detail}"),
        ),
        dep("omlx", false, "dead path. not probed"),
        dep("sglang", false, "dead path. not probed"),
    ]
}

async fn status() -> Json<Value> {
    let rows = dependencies().await;
    let missing = 12;
    Json(json!({
        "backend": { "name": "ares-governor", "port": 4810, "up": true },
        "governance": {
            "chain_verified": false,
            "merkle_head": "unanchored",
            "controls_with_missing_evidence": missing,
            "ok": false
        },
        "dependencies": dep_json(&rows)
    }))
}

async fn harness_status() -> Json<Value> {
    Json(json!({
        "runtime": "rust-tokio scaffold. no mission executor.",
        "run_concurrency_limit": 4,
        "capability_nodes": 0,
        "policy_kernel": "fail-closed scaffold. judges are not loaded.",
        "telemetry": { "configured": false, "labelled": "scaffold" },
        "memory": { "configured": false, "labelled": "scaffold" }
    }))
}

async fn models() -> Json<Value> {
    Json(json!({
        "last_seat_served": null,
        "seats": [
            {
                "id": "native-mtp",
                "kind": "native",
                "endpoint": "not configured",
                "up": false,
                "is_default": true
            },
            {
                "id": "local-omlx",
                "kind": "dead",
                "endpoint": "dead path",
                "up": false,
                "is_default": false
            },
            {
                "id": "sglang",
                "kind": "dead",
                "endpoint": "dead path",
                "up": false,
                "is_default": false
            }
        ]
    }))
}

async fn runs() -> Json<Value> {
    Json(json!([]))
}

async fn compliance_status() -> Json<Value> {
    Json(json!({
        "chain_verified": false,
        "head_digest": "unanchored",
        "audit_entries": 0,
        "report": { "rule_verdicts": controls() }
    }))
}

async fn compliance_controls() -> Json<Value> {
    Json(json!({ "controls": controls() }))
}

#[derive(Deserialize)]
struct RagBody {
    query: Option<String>,
    limit: Option<usize>,
}

async fn rag_query(Json(body): Json<RagBody>) -> (StatusCode, Json<Value>) {
    let query = body.query.unwrap_or_default();
    let trimmed = query.trim();
    if trimmed.is_empty() || trimmed.len() > 1024 {
        return (
            StatusCode::UNPROCESSABLE_ENTITY,
            Json(why(
                "/api/rag/query",
                "text query must contain 1..=1024 bytes",
            )),
        );
    }
    let _limit = body.limit.unwrap_or(8).clamp(1, 50);
    (
        StatusCode::SERVICE_UNAVAILABLE,
        Json(why(
            "/api/rag/query",
            "scaffold has no retrieval store. nothing was searched.",
        )),
    )
}

async fn dry_run() -> Json<Value> {
    Json(json!({
        "valid": false,
        "issued": false,
        "labelled": "scaffold",
        "why_receipt": {
            "evidenced_cause": "no mission geometry is loaded. a dry-run was not issued."
        }
    }))
}

async fn geometry() -> Json<Value> {
    Json(json!({
        "issued": false,
        "labelled": "scaffold",
        "why_receipt": {
            "evidenced_cause": "no mission geometry is loaded. no run was opened."
        }
    }))
}

fn router() -> Router {
    Router::new()
        .route("/api/status", get(status))
        .route("/api/harness/status", get(harness_status))
        .route("/api/models", get(models))
        .route("/api/runs", get(runs))
        .route("/api/compliance/status", get(compliance_status))
        .route("/api/compliance/controls", get(compliance_controls))
        .route("/api/rag/query", post(rag_query))
        .route("/api/harness/dry-run", post(dry_run))
        .route("/api/harness/mission/geometry", post(geometry))
        .layer(DefaultBodyLimit::max(BODY_CAP))
        .layer(RequestBodyLimitLayer::new(BODY_CAP))
        .layer(TimeoutLayer::with_status_code(
            StatusCode::REQUEST_TIMEOUT,
            Duration::from_secs(8),
        ))
}

#[tokio::main]
async fn main() {
    let listener = match tokio::net::TcpListener::bind(BIND).await {
        Ok(listener) => listener,
        Err(err) => {
            eprintln!("ares-governor failed to bind {BIND}: {err}");
            eprintln!("the live governor may already own this port. this scaffold does not take it.");
            std::process::exit(1);
        }
    };
    eprintln!("ares-governor scaffold listening on http://{BIND}");
    axum::serve(listener, router())
        .await
        .expect("governor server");
}
