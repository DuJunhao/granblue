localStorage["gbfToolCommnFg"] = 0;
if (localStorage["gbfToolCommnFg"] == undefined) {
	localStorage["gbfToolCommnFg"] = 0;
}
if (localStorage["gbfToolCommnMode"] == undefined) {
	localStorage["gbfToolCommnMode"] = 1;
}
if (localStorage["getItemShowFg"] == undefined) {
	localStorage["getItemShowFg"] = 0;
}
if (localStorage["pkBet"] == undefined) {
	localStorage["pkBet"] = "200010";
}
if (localStorage["ptZokusei"] == undefined) {
	localStorage["ptZokusei"] = "3";
}
if (localStorage["summonFg"] == undefined) {
	localStorage["summonFg"] = "1";
}
if (localStorage["noUseSkillName"] == undefined) {
	localStorage["noUseSkillName"] = "忍術,マエスティティア";
}
if (localStorage["useSkillName1"] == undefined) {
	localStorage["useSkillName1"] = "戦術策：偃月,急";
}
if (localStorage["useSkillName2"] == undefined) {
	localStorage["useSkillName2"] = "レイジ,ソング・オブ・グランデ,ミゼラブルミスト,アーマーブレイク,トレジャーハント,ディスイリュージョン,トライアド・ディセプション,レイヤーライズ,ディープダウン,フォゴトゥン・テイルズ,タブラ・ラーサ,マニガンス,オールセンセーション,ウォーフープ";
}
if (localStorage["useSkillName3"] == undefined) {
	localStorage["useSkillName3"] = "戦術策：鶴翼,戦術策：方円";
}
if (localStorage["useSkillName4"] == undefined) {
	localStorage["useSkillName4"] = "ディレイ,@delay";
}
if (localStorage["useSkillName5"] == undefined) {
	localStorage["useSkillName5"] = "ソード・オブ・リュミエール,氷晶結界,ケーニヒシルト,デリリアム,ノブレスオブリージュ,クアドリガ,エメス,グリッターミラー";
}
if (localStorage["useSkillName6"] == undefined) {
	localStorage["useSkillName6"] = "一伐の構え";
}
if (localStorage["useSkillName7"] == undefined) {
	localStorage["useSkillName7"] = "ホワイトヒール,ルネサンス,エスポワール,キュアライト";
}
if (localStorage["skillConsoleOut"] == undefined) {
	localStorage["skillConsoleOut"] = "0";
}
if (localStorage["firstChatFg"] == undefined) {
	localStorage["firstChatFg"] = "1";
}
if (localStorage["gbfToolFpsSetting"] == undefined) {
	localStorage["gbfToolFpsSetting"] = "99";
}
if (localStorage["gbfToolFpsTarget"] == undefined) {
	localStorage["gbfToolFpsTarget"] = "raid,poker";
}
if (localStorage["gbfToolFont"] == undefined) {
	localStorage["gbfToolFont"] = "メイリオ";
}
if (localStorage["maltiBossNames"] == undefined) {
	localStorage["maltiBossNames"] = "ティアマト・マグナ,コロッサス・マグナ,リヴァイアサン・マグナ,ユグドラシル・マグナ,シュヴァリエ・マグナ,セレスト・マグナ";
}
if (localStorage["gbfToolRaidTarget"] == undefined) {
	localStorage["gbfToolRaidTarget"] = "";
}
if (localStorage["friendSelFg"] == undefined) {
	localStorage["friendSelFg"] = "1";
}
if (localStorage["useCureItemFg"] == undefined) {
	localStorage["useCureItemFg"] = "0";
}
if (localStorage["skillUseFg"] == undefined) {
	localStorage["skillUseFg"] = "1";
}

//localStorage["questUrl"] = "#event/teamraid009/supporter/703041/1";

if (localStorage["useSkillName2"].indexOf("delay") == -1) {
	localStorage["useSkillName2"]=localStorage["useSkillName2"]+"@delay";
}
//	localStorage["noUseSkillType"] = "";
//	localStorage["noUseSkillName"] = "キュアライト,マエスティティア,エスポワール";
//	localStorage["fiUseSkillType"] = "";
//	localStorage["useSkillName1"] = "ミゼラブルミスト,トレジャーハント,ディスイリュージョン,トライアド・ディセプション,レイヤーライズ,ディープダウン,フォゴトゥン・テイルズ,戦術策：鶴翼,戦術策：方円,タブラ・ラーサ,マニガンス,オールセンセーション";
//	localStorage["seUseSkillType"] = "delay";
//	localStorage["useSkillName2"] = "デリリアム,ノブレスオブリージュ,クアドリガ,エメス,ルネサンス,グリッターミラー";

// ローカルストレージを取得するメッセージを受け付ける
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.action === "getLocalStorage"){
		sendResponse(localStorage);
	}
});

//chrome.tabs.onCreated.addListener(function(tab){
//	sendTabs();
//});
//chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
//	sendTabs();
//});
//chrome.tabs.onRemoved.addListener(function(tabId, removeInfo){
//	sendTabs();
//});
//
//function sendTabs(){
//	chrome.windows.getAll({populate: true}, function(windows){
//		var receiverIds = new Array();
//		var tabs = new Array();
//
//		jQuery.each(windows, function(win_idx, win){
//			jQuery.each(win.tabs, function(tab_idx, tab){
//				if(tab.url.indexOf("chrome://") != -1){
//					return;
//				}
//				//console.log("tabId="+tab.id+", tabUrl="+tab.url);
//			});
//		});
//
//		jQuery.each(receiverIds, function(idx, tabId){
//			chrome.tabs.sendMessage(tabId, {tabs: tabs}, function(response){
//				console.log(response.message);
//			});
//		});
//	});
//}
