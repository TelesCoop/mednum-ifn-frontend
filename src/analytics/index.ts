import Vue from "vue";
// @ts-ignore
import VueMatomo from "vue-matomo";
import router from "@/router/index";
// @ts-ignore
import { isSiteMH } from "@/utils/utils";

const initAnalytics = () =>
  Vue.use(VueMatomo, {
    // Configure your matomo server and site by providing
    host: "https://fragilitenumerique.matomo.cloud/",
    siteId: isSiteMH() ? 2 : 1,

    // Changes the default .js and .php endpoint's filename
    // Default: 'matomo'
    trackerFileName: "matomo",

    // Overrides the autogenerated tracker endpoint entirely
    // Default: undefined
    // trackerUrl: 'https://example.com/whatever/endpoint/you/have',

    // Overrides the autogenerated tracker script path entirely
    // Default: undefined
    // trackerScriptUrl: 'https://example.com/whatever/script/path/you/have',

    // Enables automatically registering pageviews on the router
    router: router,

    // Enables link tracking on regular links. Note that this won't
    // work for routing links (ie. internal Vue router links)
    // Default: true
    enableLinkTracking: true,

    // Require consent before sending tracking information to matomo
    // Default: false
    requireConsent: false,

    // Whether to track the initial page view
    // Default: true
    trackInitialView: true,

    // Run Matomo without cookies
    // Default: false
    disableCookies: false,

    // Enable the heartbeat timer (https://developer.matomo.org/guides/tracking-javascript-guide#accurately-measure-the-time-spent-on-each-page)
    // Default: false
    enableHeartBeatTimer: false,

    // Set the heartbeat timer interval
    // Default: 15
    heartBeatTimerInterval: 15,

    // Whether or not to log debug information
    // Default: false
    debug: false,

    // UserID passed to Matomo (see https://developer.matomo.org/guides/tracking-javascript-guide#user-id)
    // Default: undefined
    userId: undefined,

    // Share the tracking cookie across subdomains (see https://developer.matomo.org/guides/tracking-javascript-guide#measuring-domains-andor-sub-domains)
    // Default: undefined, example '*.example.com'
    cookieDomain: undefined,

    // Tell Matomo the website domain so that clicks on these domains are not tracked as 'Outlinks'
    // Default: undefined, example: '*.example.com'
    domains: undefined,

    // A list of pre-initialization actions that run before matomo is loaded
    // Default: []
    // Example: [
    //   ['API_method_name', parameter_list],
    //   ['setCustomVariable','1','VisitorType','Member'],
    //   ['appendToTrackingUrl', 'new_visit=1'],
    //   etc.
    // ]
    preInitActions: [],
  });

export default initAnalytics;
