import React from "react";
import { addSettings } from "./../actions/settings";
import FileUpload from './FileUpload';
import { combineReducers } from 'redux';

const Benefits = () => (
  <div className="list-header__flex__center">
    <ul>
      <li>urilinks.com Benefits:</li>
    
      <li>
        You save bookmarks to web pages that you want to return to. It is similar to
        a filing cabinet for pages.
      </li>       
       <li>Everyone gets their own private account.</li>
      <li>Your account is secret from other accounts.</li>
      <li>
       You may export and then import bookmarks to this program from these browsers: chrome, firefox, edge, opera, brave
      </li>
     
      <li>Instructional Steps:</li>
       <li>
        To upload a browser's bookmarks file:<br />
        1. go to the bookmarks manager and export the bookmarks FileUpload<br />
        2. click on "bookmarks uploader" within urilinks.combineReducers<br />
        3. click on "upload file" to select the bookmmarks file you exported<br />
        4. click on "upload"<br />
        5. click on "convert folder names to hashtags"<br />
        6. click on "import bookmarks"<br />
        7. follow the confirmation step.<br />
        8. look for the bookmarks in the hashtag list or through "search folder name" dropdown list
         <li>
        Note: If you bookmark google or youtube pages, you may need to change the
        hashtag by editing the note section in the link because for a youtube
        page the default hashtag will be #youtube and for a google page, the
        default hashtag will be #google.
      </li>
       </li>

        <li>
        To add a bookmark one at a time:
        1. click "Add Bookmark"
        2. fill out the information
      </li>

       <li>
        To chat about a bookmark you have, follow these steps:<br />
        1. see if family member or friend is online by click on the blue circle bedow the bookmark.<br />
        2. if person is online, send him or her a chat saying you are going to send a bookmark to their news feed.<br />
        3. click on facebook button to the far left below the bookmark to send the bookmark to person's facebook news feed.<br />
        5. go back to messenger to chat abbout the bookmark with your family member or friend.<br />
      </li>

       <li>
        AI cannot replace the way you want to organize your internet bookmarks
        with hash tags.
      </li>
      <li>
        Bookmarks are sharable with others, just email a person with your
        bookmarks.html file.
      </li>
    
      <li>
        You are able to see your bookmarks better in a neat clickable list
        layout. You may add a note up to 1,024 characters using the free plan,
        2,300 for the other plans to your link from the Add bookmark button
        or later through the Edit Uri/Url Link button.
      </li>

      <li>
        All of your holy church, entertainment, business or educational links
        are in one place with one click link activation.
      </li>

    

      <li>
        For each website link that you save, you have the option of entering a
        note. Hashtag(s) are entered into the note area. Example: #givingcharity
        #mountains. You may enter as many hashtags as their is room.
      </li>

      <li>
        Their are three options to get search results: "Date", "Link Text",
        "Hast Tag and Note Text" from the dropdown list.
      </li>

      <ul>
        <li>
          "Date" selected: The results will be in descending order, most recent
          added link will be listed first.
        </li>

        <li>
          "Link Text" selected: the results will display results that have the
          search term in the link's link text in alphabetical order.
        </li>

        <li>
          "Hash Tag" selected: the results will give links that contain the hash
          tag in the note. They will be given in alphabetical order. You may
          organize any group of links this way. For example, if you have 5
          uri/url links that are your favorites, put The hash tag #favorite in
          the note section for each of the 5 in the add bookmark form. You will
          need two or more hash tags for the hash tags window to appear.
        </li>

        <li>
          "Note Text" selected: the results will display results that have the
          search term in the link's note section. The results list will be given
          in alphabetical order.
        </li>
      </ul>

      <li>
        For each of the three types of searches, you may enter a{" "}
        <span className="highlight1">date range</span> to narrow the search.
      </li>

      <li>
        As you enter the <span className="highlight1">Search Link text</span>,
        the results will display, no need to press a search button.
      </li>
      <li>
        I now offer 5 plans, free, almost free, basic, standard and premium. The
        free plan has space to store up to 250 bookmarks when you initially sign
        up. If you revert to storage capacity up to 250 bookmarks, the plan is
        called almost free and the charge is .99 per year. Stripe won't let me
        have a plan that is free. For the initial signup, I don't need stripe so
        I can give the first storage capacity of 250 bookmarks for free. The
        basic plan is $4.99/year and space to store up to 1500 bookmarks. The
        standard plan is $9.99/year and space to store up to 2,500 bookmarks and
        the premium plan is $14.99 and space to store up to 5,000 bookmarks.
        Please see the header section of the home page and click on the "click
        to change plan" link.
      </li>
    
      <li>
        To find your newly uploaded bookmarks, select hashtag from the dropdown
        menu and then in the field to the left enter the hash tag.
      </li>
      <li>Glossary:</li>
      <li>
        Bookmarks are uri/url links. uri, uniform resource identifier, is a more
        general term for url, uniform resource locator.
      </li>
    <li>
    ttjohninvest@gmail.com, 775 507-0098, John
    <br />
    <br />
    urilinks.com
    </li>
    </ul>
  </div>
);

export default Benefits;
