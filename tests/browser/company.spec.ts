import {test,expect} from '@playwright/test';
import {companyDocuments} from '../../src/content/companyDocuments';

test('every company notice renders unique content, valid section navigation and contact at mobile width',async({page})=>{
 await page.setViewportSize({width:390,height:844});
 const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));
 for(const document of companyDocuments){
  await page.goto(document.path);
  await expect(page.getByRole('heading',{level:1})).toHaveText(document.title);
  await expect(page.locator('.notice-meta')).toContainText('Published draft');
  for(const section of document.sections){await expect(page.locator(`#${section.id}`)).toContainText(section.title)}
  await expect(page.locator('.notice-contact > a')).toHaveAttribute('href','mailto:sbarteau2022@gmail.com');
  const width=await page.evaluate(()=>({scroll:document.documentElement.scrollWidth,viewport:innerWidth}));expect(width.scroll).toBeLessThanOrEqual(width.viewport+1);
 }
 expect(errors).toEqual([]);
 await page.goto('/privacy');await expect(page.getByRole('heading',{name:'Know where your information goes.'})).toBeVisible();await page.screenshot({path:'output/audit-company-mobile.png',fullPage:true});
});

test('footer links use dedicated company and trust destinations',async({page})=>{
 await page.goto('/about');
 const footer=page.getByRole('contentinfo');
 for(const path of ['/about','/careers','/roadmap','/updates','/docs','/api-reference','/status','/research-policy','/accessibility','/disclosures','/data-practices','/sources','/privacy','/cookies','/terms','/security']){
  await expect(footer.locator(`a[href="${path}"]`).first()).toBeVisible();
 }
 await footer.getByRole('link',{name:'Terms of use',exact:true}).click();await expect(page.getByRole('heading',{level:1})).toHaveText('Use the work responsibly.');
 await page.goto('/sources');await expect(page.locator('.notice-table tbody tr')).toHaveCount(25);
 await page.setViewportSize({width:1440,height:1000});await page.goto('/privacy');await expect(page.getByRole('heading',{name:'Know where your information goes.'})).toBeVisible();await page.screenshot({path:'output/audit-company-desktop.png',fullPage:true});
});

test('status check is opt-in and distinguishes presence from end-to-end availability',async({page})=>{
 let calls=0;
 await page.route('**/api/health',r=>{calls++;return r.fulfill({json:{ok:true,profiles:true,research:true,ai:true}})});
 await page.route('**/api/auth-status',r=>{calls++;return r.fulfill({json:{emailAvailable:true}})});
 await page.goto('/status');await expect(page.getByRole('heading',{level:1})).toBeVisible();expect(calls).toBe(0);
 await page.getByRole('button',{name:'Run live check'}).click();
 await expect(page.locator('.notice-status [role="status"]')).toContainText('Both databases reachable');
 await expect(page.locator('.notice-status [role="status"]')).toContainText('Account email configuration present');expect(calls).toBe(2);
 await expect(page.locator('main')).toContainText('does not prove Gmail authentication or inbox delivery');
});

test('status handles provider errors and malformed successful responses without a false healthy result',async({page})=>{
 await page.route('**/api/health',r=>r.fulfill({status:503,json:{error:'Unavailable'}}));
 await page.route('**/api/auth-status',r=>r.fulfill({json:{emailAvailable:false}}));
 await page.goto('/status');await page.getByRole('button',{name:'Run live check'}).click();
 const result=page.locator('.notice-status [role="status"]');await expect(result).toContainText('Health check unavailable');await expect(result).toContainText('configuration unavailable');
 await page.route('**/api/health',r=>r.fulfill({body:'null',contentType:'application/json'}));
 await page.route('**/api/auth-status',r=>r.fulfill({body:'null',contentType:'application/json'}));
 await page.getByRole('button',{name:'Run live check'}).click();await expect(result).toContainText('Email configuration check unavailable');await expect(result).not.toContainText('Both databases reachable');
});
