//const parse = require('bookmarks-parser')
import parse from 'bookmarks-parser'

parse(`<!DOCTYPE NETSCAPE-Bookmark-file-1>
<!-- This is an automatically generated file.
     It will be read and overwritten.
     DO NOT EDIT! -->
<META HTTP-EQUiv="Content-Type" CONTENT="text/html; charset=UTF-8">
<TITLE>Bookmarks</TITLE>
<H1>Bookmarks</H1>
<DL><p>
    <DT><h3 add_date="1749234945" last_modified="1750694169" personal_toolbar_folder="true">Bookmarks</h3>
    <dl><p>
     <h3 add_date="1750690604" last_modified="1750690753">recipesfood</h3>
        <dl><p>
            </p><dt><a href="https://www.youtube.com/watch?v=4kLaRWku_oM" add_date="1750690569" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhUlEQVQ4ja3Tv2pUQRTH8c+Ze9e4CAGNlSSa2CmCGE0hgm/gA9j5BlY+RawFGwtbH0IkiGCwEMQ2aFIFokGUGHfvjMXcTTapZPHAMH84Z+bM+f5OQCGQ1HnKbvf7D+XkuYIclEnwTFaIqIsbS5xZI1+gOUceoiWa3rXDmHRA94v0jT+b4dN2FKsPSC9wsTqnOkXURI8ynlieLPbIj6JYfUNzn25EpN67MKpJpIZ8FBR1lEwzoNtIlKt0mdJQEhq61sqV1mAwkH8MpNQS7bFPaWpMLCfSQn251kOK4Gd4/DC8fs7dO+T94DBIcfy/SJSFhLPH/4uY3GPcce8mGy959YzlRYyImKY2TLMinFiL3xj21S5KqS+0DW8/8mSdd+/7ROcoeRrJQRS3tolLtfgRtdAdK0vs7IbRPmm+yGUKYZnob6cltmgWT2Jsiq0vPcb5KYzRY9RjHG+1WKdcI50SUtsr3qkWyapCyx7xtJfy9cvMrZHO4x+kHN853Ayfv/6vZpq9nf8CnF2KWbg2p58AAAAASUVORK5CYII=">The NEW Lentil Soup I've been making every week! - YouTube</a>
            </dt><dt><a href="https://www.youtube.com/watch?v=qvlOQCoXBkc" add_date="1750690645" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhUlEQVQ4ja3Tv2pUQRTH8c+Ze9e4CAGNlSSa2CmCGE0hgm/gA9j5BlY+RawFGwtbH0IkiGCwEMQ2aFIFokGUGHfvjMXcTTapZPHAMH84Z+bM+f5OQCGQ1HnKbvf7D+XkuYIclEnwTFaIqIsbS5xZI1+gOUceoiWa3rXDmHRA94v0jT+b4dN2FKsPSC9wsTqnOkXURI8ynlieLPbIj6JYfUNzn25EpN67MKpJpIZ8FBR1lEwzoNtIlKt0mdJQEhq61sqV1mAwkH8MpNQS7bFPaWpMLCfSQn251kOK4Gd4/DC8fs7dO+T94DBIcfy/SJSFhLPH/4uY3GPcce8mGy959YzlRYyImKY2TLMinFiL3xj21S5KqS+0DW8/8mSdd+/7ROcoeRrJQRS3tolLtfgRtdAdK0vs7IbRPmm+yGUKYZnob6cltmgWT2Jsiq0vPcb5KYzRY9RjHG+1WKdcI50SUtsr3qkWyapCyx7xtJfy9cvMrZHO4x+kHN853Ayfv/6vZpq9nf8CnF2KWbg2p58AAAAASUVORK5CYII=">Done in 20mins Chinese Vegetable Soup! - YouTube</a>
            </dt><dt><a href="https://www.youtube.com/watch?v=b33f-BGgahA" add_date="1750690682" icon="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABhUlEQVQ4ja3Tv2pUQRTH8c+Ze9e4CAGNlSSa2CmCGE0hgm/gA9j5BlY+RawFGwtbH0IkiGCwEMQ2aFIFokGUGHfvjMXcTTapZPHAMH84Z+bM+f5OQCGQ1HnKbvf7D+XkuYIclEnwTFaIqIsbS5xZI1+gOUceoiWa3rXDmHRA94v0jT+b4dN2FKsPSC9wsTqnOkXURI8ynlieLPbIj6JYfUNzn25EpN67MKpJpIZ8FBR1lEwzoNtIlKt0mdJQEhq61sqV1mAwkH8MpNQS7bFPaWpMLCfSQn251kOK4Gd4/DC8fs7dO+T94DBIcfy/SJSFhLPH/4uY3GPcce8mGy959YzlRYyImKY2TLMinFiL3xj21S5KqS+0DW8/8mSdd+/7ROcoeRrJQRS3tolLtfgRtdAdK0vs7IbRPmm+yGUKYZnob6cltmgWT2Jsiq0vPcb5KYzRY9RjHG+1WKdcI50SUtsr3qkWyapCyx7xtJfy9cvMrZHO4x+kHN853Ayfv/6vZpq9nf8CnF2KWbg2p58AAAAASUVORK5CYII=">Easy and Flavorful Chinese Vegetable Soup | The secret seasoning is... - YouTube</a>
        </dt></dl><p>
        </p>
    </DL><p>`, function(err, res) {
  //console.log(err);
  //console.log(res.parser);
  console.log(JSON.stringify(res.bookmarks,null,4));
});