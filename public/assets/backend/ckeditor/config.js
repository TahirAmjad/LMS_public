/**
 * @license Copyright (c) 2003-2019, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

var getUrl = window.location;
var finalurl = getUrl.protocol + "//" + getUrl.hostname;
let insertUrl = finalurl + "/marketing_crm/upload_image_to_server";
console.log(insertUrl);
CKEDITOR.editorConfig = function(config) {
	config.extraPlugins = "emoji,autocomplete,textmatch,ajax,xml,simage";
	config.removePlugins = "easyimage ,cloudservices,image";
	config.imageUploadURL = insertUrl;
};
