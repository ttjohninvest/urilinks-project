import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from "./FileUpload";
import { combineReducers } from "redux";
import StorageSizes from './StorageSizes'

const Benefits = () => {
return (<div>
 
  <div className="list-header__flex__center">
Medical Referral Links Management System Usage:<br />
-This tool is to help people manage their internet links. They can add, search, share them with others, delete<br />
  and view them by clicking on them. You may upload a bookmark file that is under 100kb. You may add them one by one.<br />
-a sharable link is provided so that you may share your content with others<br />
-what saving bookmarks to chrome browser bookmarks, you will need to enter a file name so when they are imported<br />
  you will so your folder name as a menu item<br />
-the menu items are in ascii alphabetical order, numbers appear before letters<br />
-if you want a menu item to appear before another menu item, preceed the hashtag name with 1 or more zeros<br />
  two zeros will sort before one zero<br />
-links are not limited to commercial purposes<br />
-search through link titles, hashtags or notes<br />
-easy grouping or regrouping of links by hashtag by adding or removing hashtags from the note sections<br />
-hashtags need to be entered in pascal case for example #TheCatIsFriendly so they will have spaces between words in the left menu pane.<br /> 
-the # hash is removed and spaces are added and presented in alphabetical order<br />
-when a link in the left sidebar is clicked, clickable link results will appear to the adjacent content area.<br />
-a link may be added one at a time through the "Add Link" button and appear in the left side menu pane<br />
-your google name and profile picture will appear at the top of your page<br />
-if you accidentally loose your data, please contact me and give me your userid at johmcg64@gmail.com or 775 559 5740<br />
 and I will restore your data from back up. You can obtain your user id from the user id in the title on your urilinks home page.
 It is the alpha numberic string that appears after the id=. Thank you.
-plans: [the free plan stores up to {StorageSizes.free} links], [The basic plan stores up to {StorageSizes.basic} links<br />
-for $4.99 per year], [the standard plan stores up to {StorageSizes.standard} links for $9.99 per year],<br />
-[the premium plan stores up to {StorageSizes.premium} links for $14.99 per year]<br />
-a plan may be upgraded at anytime; the new plan supersedes the old plan and the yearly pay cycle<br />
-renews on day of plan selection and yearly renewal and old plan is canceled<br />
-easy account deletion, no refunds<br />
<br />
-If you have any questions, comments or concerns, please contact me, John, at john@urilinks.com or johmcg64@gmail.com<br />
-my phone number is 775 559 5740. I am happy to help you.
</div>
<div>
Does the Nevada Government regulate medical service providers?<br />
Yes, the Nevada government heavily regulates how vendors do business with medical providers<br />
through a combination of state licensing laws, federal statutes, and the Corporate Practice of<br />
Medicine (CPOM) doctrine. Corporate Practice of Medicine (CPOM): Nevada strictly prohibits<br />
non-physician entities from owning or controlling medical practices. Vendors providing<br /> 
administrative services must typically operate as a Management Services Organization (MSO)<br /> 
under a formal Management Services Agreement (MSA) that separates business operations from clinical<br />
decision-making, which must remain with licensed physicians. Federal Compliance: Vendors must adhere<br />
to the Stark Law (prohibiting self-referrals for financial gain) and the Anti-Kickback Statute<br />
(prohibiting remuneration for referrals), with contracts requiring fair market value compensation<br />
to avoid liability. Data Privacy: Under SB 370, vendors handling consumer health data must comply<br />
with strict privacy and security requirements, regardless of revenue thresholds, if they process<br />
data for Nevada-based healthcare entities. Licensing: The Nevada State Board of Medical Examiners<br />
and other regulatory bodies enforce licensing standards, meaning vendors facilitating care must<br /> 
ensure their contracts and operational structures do not compromise provider licensure or patient safety.<br /> 
<br/>
stark law<br/>
The Federal Stark Law, also known as the Physician Self-Referral Law, prohibits physicians from referring<br/>
Medicare or Medicaid patients for designated health services (DHS) to entities with which the<br/>
physician or an immediate family member has a financial relationship,<br/>
unless a specific regulatory exception applies.<br/> 
<br/>
Key characteristics of the law include:<br/>
<br/>
Scope: It applies to a wide range of DHS, including clinical laboratory services, radiology, physical<br/>
therapy, durable medical equipment, and hospital services. A "financial relationship" encompasses ownership,<br/> 
investment interests, and compensation arrangements. Strict Liability: The law is a strict liability<br/>
statute, meaning intent to violate the law is not required for a violation to occur; technical<br/>
non-compliance can trigger penalties. Penalties: Violations result in denial of payment for the services,<br/>
mandatory refunds of amounts collected, civil penalties of up to $15,000 per prohibited referral,<br/>
and potential exclusion from federal healthcare programs. False Claims Act: Claims submitted in<br/>
violation of the Stark Law are considered false or fraudulent claims under the False Claims Act,<br/>
which can lead to treble damages (three times the claim amount) and additional civil monetary penalties.<br/>
Distinction from Anti-Kickback Statute: Unlike the Anti-Kickback Statute, which is a criminal law<br/>
requiring proof of intent to induce referrals, the Stark Law is a civil law focused on the existence<br/>
of a financial relationship and the resulting referral. The law was originally enacted in 1989<br/>
(Stark I) and expanded in 1993 (Stark II) to cover Medicaid and additional services, aiming to<br/>
eliminate conflicts of interest where financial gain might influence medical decision-making.<br/>
</div>
</div>)
};

export default Benefits;
