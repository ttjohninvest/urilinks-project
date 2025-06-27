import React from "react";
import { addSettings } from "./../actions/settings";

const Benefits = () => (
  <div className="list-header__flex__center">
    <ul>
      <li>urilinks.com Benefits:</li>
      <li>You may upload your bookmarks from Brave, Chrome, Firefox, Edge, Vivaldi or Opera browser. After you have uploaded through the "bookmarks uploader" link, the bookmark folders are converted into hashtags for easy finding during hashtag search.</li>
      <li>Add Uri/Url Link button on the home page is used to add a url link to your private account.</li>
      <li>Please use it for good.</li>
      <li>Using the website is free. It supports 250 uri/url links per private user account.</li>
      <li>Everyone gets their own private account.</li>
      <li>Your account is secret from other accounts.</li>
      <li>
        AI cannot replace the way you want to organize your internet bookmarks
        with hash tags.
      </li>
      <li>
        Links are uri/url links. uri, uniform resource identifier, is a more
        general term for url, uniform resource locator.
      </li>
      <li>
        You are able to see your bookmarks better in a neat clickable list layout. You may add a note to your link from the Add Uri/Url Link button or later through the Edit Uri/Url Link button.
      </li>
      <li>
        All of your holy church, entertainment, business or educational links
        are in one place with one click link activation.
      </li>

      <li>
        The links will activate in place but if you want the link to open in a
        new browser tab, right click on the link and select open in new tab.
      </li>

      <li>
        You save links to websites that you want to return to. It is similar to
        a rolodex for phone numbers.
      </li>

      <li>
        For each website link that you save, you have the option of entering a
        note.
      </li>

      <li>
        To enter a link to save, press "Add Uri/Url Link" button, copy and paste
        in the link text or type it in, copy and paste in the link uri/url from
        the browser or type it inside the uri/url text field in the website,
        type in or copy and paste in an optional note, then click "Save Uri/Url
        Link".
      </li>

      <li>
        Their are three options to get results: "Date", "Link Text", "Hast Tag
        and Note Text".
      </li>

      <li>
        Select what kind of search you want from the{" "}
        <span className="highlight1">drop down list</span>: "Date","Link Text",
        "Hash Tag" or "Note Text" from the drop down menu.
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
          tag in the note. You may organize any group of links this way. For
          example, if you have 5 uri/url links that are your favorites, put The
          hash tag #favorite in the note section for each of the 5 in the add
          uri/url form. You will need two or more hash tags for the hash tags
          window to appear.
        </li>

        <li>
          "Note Text" selected: the results will display results that have the
          search term in the link's note section.
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
      <li>These are the supported browsers:  chrome, firefox, edge, opera, brave</li>
      <li>To find your newly uploaded bookmarks, select hashtag from the dropdown menu and then in the field to the left enter the hash tag.</li>
    </ul>
    <br />
    <br />
  </div>
);

export default Benefits;
