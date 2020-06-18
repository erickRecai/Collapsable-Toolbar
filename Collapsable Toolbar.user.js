// ==UserScript==
// @name         Collapsable Toolbar
// @namespace    https://github.com/erickRecai
// @version      1.01.04
// @description  Creates a toolbar to place buttons/functions from userscripts.
// @author       guyRicky

// @match        *://*/*
// @noframes

// @exclude      *://docs.google.com/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js

// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
/* jshint esversion: 6 */

(function () {
    'use strict';

    /*
    == last update: 6/18/2020 ==

    == todo ==
    10. move width and tranparency options to script options/local storage.
    
    == code markers ==
    AA. determine and set collapse state.
    AB. generate and add toolbar.
    AC. hide, open and close events.
    ZZ. script CSS
    
    */
    const toolbarWidth = 90;
    const toolbarTransparency = .2; // set to a value between 0 and 1, 1 is no transparency, .5 is 50% transparency.

    // ==== AA. initialize main container =========================================================|

    let startCollapsed = 0; // 1 to start collapsed, 0 to start fully visible.
    const localStorageName = "ctb start collapsed";
    if (window.localStorage.getItem(localStorageName)) {
        startCollapsed = window.localStorage.getItem(localStorageName);
        startCollapsed = (startCollapsed == "true");
    }

    const visibleClass = "ctb-visible";
    const hiddenClass = "ctb-hidden";

    let startingStateClass = visibleClass;
    let otherStartingStateClass = hiddenClass;
    if (startCollapsed) {
        startingStateClass = hiddenClass;
        otherStartingStateClass = visibleClass;
    }

    // ==== AB. create element ====================================================================|

    const openButtonId = "ctb-open";
    const hideButtonId = "ctb-hide";

    let collapsableToolbarElement =
        "<div id='ctb-main-container'>"+
            "<div id='"+ openButtonId +"' class='"+ otherStartingStateClass +" ctb-green ctb-rounded-block'>ctb-open</div>"+
            "<div id='"+ hideButtonId +"' class='"+ startingStateClass +" ctb-red ctb-rounded-block'>ctb-hide</div>"+
            "<div id='ctb-inner-container' class='"+ startingStateClass +"'>"+
                "<div id='ctb-container1'></div>"+
                "<div id='ctb-container2'></div>"+
                "<div id='ctb-container3'></div>"+
            "</div>"+
            "<div id='ctb-close' class='ctb-gray ctb-rounded-block "+ startingStateClass +"'>close ctb</div>"+
        "</div>";

    jQuery("body").prepend(collapsableToolbarElement);

    // ==== AC. ctb events/functions ==============================================================|
    const mainSelector = "#ctb-inner-container, #"+ hideButtonId +", #ctb-close";

    jQuery("#"+ hideButtonId).click(function () {
        //console.log(hideButtonId);
        window.localStorage.setItem(localStorageName, true);

        switchClasses(
            mainSelector,
            "#"+ openButtonId,
            visibleClass,
            hiddenClass
        );
    });

    jQuery("#"+ openButtonId).click(function () {
        //console.log(openButtonId);
        window.localStorage.setItem(localStorageName, false);

        switchClasses(
            mainSelector,
            "#"+ openButtonId,
            hiddenClass,
            visibleClass
        );
    });

    function switchClasses(mainSelector, subSelector, removedClass, newClass) {
        jQuery(mainSelector).removeClass(removedClass);
        jQuery(mainSelector).addClass(newClass);
        jQuery(subSelector).removeClass(newClass);
        jQuery(subSelector).addClass(removedClass);
    }

    // ==== close ====
    jQuery("#ctb-close").click(function () { jQuery("#ctb-main-container").remove(); });

    // ==== ZZ. script CSS ========================================================================|

    if(1){
        const cToolsCss =
`<style type="text/css">
    #ctb-main-container {
        max-width: `+ toolbarWidth +`px;
        max-height: 50%;
        overflow-x: hidden;
        overflow-y: auto;
        margin: 0 2px 2px; /* right and bottom spacing */
        line-height: initial;

        display: block;
        opacity: `+ toolbarTransparency +`;
        position: fixed;
        bottom: 0px;
        right: 0px;
        z-index: 9999;

        font-size: 11px !important;
        font-weight: bold !important;
        text-align: center !important;
        color: black !important;
    }
    #ctb-main-container:hover {
        opacity: 1;
    }

    #ctb-main-container>div{
        margin: 2px 0;
    }
    #ctb-main-container input {
        max-width: `+ (toolbarWidth - 10) +`px;
        padding: 1px;
        margin: 1px 0;
    }
    #ctb--main-container > div, #ctb-inner-container > div > div{
        margin: 2px 0;
    }
    .ctb-rounded-block { /* standard css for most blocks */
        display: block;
        padding: 2px;
        border-radius: 3px;
        margin: 2px 0;

        font-size: 11px !important;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }

    .ctb-green {
        background: #62bb66;
    }
    .ctb-yellow {
        background:  #ffc107;
    }
    .ctb-orange {
        background: #FF9800;
    }
    .ctb-red {
        background: #e06464;
    }
    .ctb-blue {
        background: #50a6fe;
    }
    .ctb-gray {
        background: #777777;
        text-align: center;
    }

    .ctb-hidden {
        display: none !important;
    }
    .ctb-visible {
        display: block !important;
    }
    .ctb-visible-inline {
        display: inline-block !important;
    }
</style>`;
        jQuery(document.body).append(cToolsCss);
    }

})();