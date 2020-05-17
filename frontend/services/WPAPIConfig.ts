import WPAPI from "wpapi";
import Config from "../config";

const wp = new WPAPI({ endpoint: Config.apiUrl });

// This route is copied from the plugin: wordpress/wp-content/plugins/wp-rest-api-v2-menus/wp-rest-api-v2-menus.php
wp.menus = wp.registerRoute("menus/v1", "/menus/(?P<id>[a-zA-Z(-]+)");

export default wp;
