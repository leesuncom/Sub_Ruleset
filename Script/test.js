/*修复版  备用
[Script]
http-response ^https?://.*\.snssdk\.com/bds/feed/stream/ requires-body=1,max-size=-1,script-path=https://raw.githubusercontent.com/Liquor030/Sub_Ruleset/master/Script/Super.js
[MITM]
hostname = *.snssdk.com
*/
var obj = JSON.parse($response.body);
if (obj.data.data) {
  for (var i = obj.data.data.length - 1; i >= 0; i--) {
    if (obj.data.data[i].item.video != null) {
      obj.data.data[i].item.video.video_download.url_list = obj.data.data[i].item.video.video_high.url_list
    }
    if (obj.data.data[i].ad_info != null) {
      obj.data.data.splice(i, 1);
    }
  }
}
obj = JSON.stringify(obj);
obj = obj.replace(/\"cell_id\":\d+,\"cell_id_str\":\"(\d+)\"/g,'\"cell_id\":$1,\"cell_id_str\":\"$1\"');
obj = obj.replace(/tplv-ppx-logo.image/g,'0x0.gif');
obj = obj.replace(/tplv-ppx-logo/g,'0x0');
var body = obj.replace(/\"item_id\":\d+,\"item_id_str\":\"(\d+)\"/g,'\"item_id\":$1,\"item_id_str\":\"$1\"');
$done({body});
