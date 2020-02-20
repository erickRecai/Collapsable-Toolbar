// ==UserScript==
// @name         Collapsable Toolbar
// @namespace    https://github.com/erickRecai
// @version      1.0.0
// @description  Creates a toolbar to place buttons from userscripts.
// @author       guyRicky

// @match        *://*/*
// @noframes

// @exclude      *://docs.google.com/*

// @require      https://code.jquery.com/jquery-3.4.1.min.js

// @licence      CC-BY-NC-SA-4.0; https://creativecommons.org/licenses/by-nc-sa/4.0/
// @licence      GPL-3.0-or-later; http://www.gnu.org/licenses/gpl-3.0.txt
// ==/UserScript==
/* jshint esversion: 6 */

/*
## errors ##
- some sites don't function properly with userscripts that use jquery.
https://erickthingsblog.wordpress.com/2019/09/12/userscript-jquery-errors/
*/

(function () {
    'use strict';

    const buttonTransparency = .2; // set to a value between 0 and 1, 1 is no transparency, .5 is 50% transparency.
    const startCollapsed = 0; // 1 to start collapsed, 0 to start uncollapsed.

    if (!jQuery("#ctb-buttons").length) {

        let startingClass = "ctb-visible";
        let startingClass2 = "ctb-hidden";
        if (startCollapsed) {
            startingClass = "ctb-hidden";
            startingClass2 = "ctb-visible";
        }

        // ==== create element ====================================================================|
        let webtoolsElements = [
            "<div id='ctb-placeholder'>",
            "<div id='ctb-open' class='"+ startingClass2 +"'>Open</div>",
            "<div id='ctb-hide' class='"+ startingClass +"'>Hide</div>",
            "<div id='ctb-buttons' class='"+ startingClass +"'>",
            "<div id='ctb-close'>&times;</div>"
        ];

        let webtoolsElement =
            webtoolsElements[0] +
            webtoolsElements[1] +
            webtoolsElements[2] +
            webtoolsElements[3] +
            webtoolsElements[4] +"</div></div>"
        jQuery("body").prepend(webtoolsElement);

        // ==== functions =========================================================================|
        jQuery("#ctb-open").click(function () {
            console.log("ctb-open");
            jQuery("#ctb-buttons").removeClass("ctb-hidden");
            jQuery("#ctb-buttons").addClass("ctb-visible");
            jQuery("#ctb-open").removeClass("ctb-visible");
            jQuery("#ctb-open").addClass("ctb-hidden");
            jQuery("#ctb-hide").removeClass("ctb-hidden");
            jQuery("#ctb-hide").addClass("ctb-visible");
        });
        jQuery("#ctb-hide").click(function () {
            console.log("ctb-hide");
            jQuery("#ctb-buttons").removeClass("ctb-visible");
            jQuery("#ctb-buttons").addClass("ctb-hidden");
            jQuery("#ctb-open").removeClass("ctb-hidden");
            jQuery("#ctb-open").addClass("ctb-visible");
            jQuery("#ctb-hide").removeClass("ctb-visible");
            jQuery("#ctb-hide").addClass("ctb-hidden");
        });

        jQuery("#ctb-close").click(function () { jQuery("#ctb-placeholder").remove(); });

        // ==== CSS ===============================================================================|
        const webtoolsCss =
`<style type="text/css">
    #ctb-placeholder {
        width: 40px;
        margin: 0 2px 2px;
        display: block;
        opacity: `+ buttonTransparency +`;
        position: fixed;
        bottom: 0px;
        right: 0px;
        z-index: 9999;
    }
    #ctb-placeholder:hover {
        opacity: 1;
    }
    #ctb-placeholder div {
        display: block;
        padding: 2px;
        border-radius: 4px;
        margin-top: 2px;
        font-size: 11px !important;
        font-weight: bold;
        text-align: center;
        cursor: pointer;
    }
    #ctb-placeholder input {
        width: 70px;
        float: right;
    }

    #ctb-open {
        background: #77ff77;
    }
    #ctb-hide {
        background: #ff7777;
    }
    #ctb-close {
        background: #777777;
        text-align: center;
    }

    .ctb-hidden {
        display: none !important;
    }
    .ctb-visible {
        display: block !important;
    }
</style>`;
        jQuery(document.body).append(webtoolsCss);
    }
})();
