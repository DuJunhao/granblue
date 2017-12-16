var gbfToolCommnFg	=	0;
var gbfToolCommnMode=	0;

var gbfToolFpsTarget=	[];
var gbfToolFpsSetting=	0;

var gbfToolFont		=	"";
var defaultFont		=	"";

var STR_M_TOP		=	"0001";
var STR_M_MYPAGE	=	"0002";
var	STR_M_K_TOP		=	"0100";
var	STR_M_K_ROOM	=	"0101";
var	STR_M_K_OFFER	=	"0102";
var	STR_M_SUPPO		=	"0200";
var	STR_V_RAID		=	"1000";
var	STR_V_RESULT	=	"1001";
var	STR_V_QUETOP	=	"1100";
var	STR_V_QUE		=	"1101";
var	STR_V_MULTI		=	"1102";
var	STR_K_PK		=	"2000";

var	MODE_SENTOU		=	1;
var	MODE_KYOUTOU	=	2;
var	MODE_QUEST		=	3;
var	MODE_SHUUKAI	=	4;
var MODE_POKER		=	5;
var MODE_VAREN		=	6;
var MODE_VAREN2		=	7;
var MODE_KYOUKA		=	8;
var MODE_MALTI		=	10;


//print(getOption("message"));
// writeFile("status", "");
// %USERPROFILE%\AppData\Local\Google\Chrome\User Data\Default\File System
// mklink /D "C:\Program Files (x86)\Google\Chrome\Application\User Data\a2\Default\File System" "E:\chrome\File System"
//sleep(5);
//var readStr = "初期値";
//var writeStr = "abc";
//print("readStr = "+readStr);
//writeFile("status.txt", writeStr);
//sleep(3);

//var 
//damage
//delay
//attack_down
//defense_down
//gravity
//clear
//attack_up
//damage
//
//キャラ4 : ailments_if
//regeneration,special_skill_gauge_bonus
var	windowZoom	= "0.9";

var	nowStamina	= 0;
var	nowBp		= 0;
var	maxStamina	= 0;

// 救援
var	kyuuenFg	= false;
var	kyuuenSt	= new Array("1","1","0");

// 周回クエURL・消費ＡＰ
var	questUrl	= "";
var	questAp		= 1000;

// 回復薬取る？
var firstChatFg	= true;

// 攻撃フラグ
var attackFg	= true;
var skillUseFg	= true;

var summonFg	= true;

// PT属性
var ptZokusei	= 3;

// 獲得アイテム
var getItemShowFg= 0;

// 回復アイテム使用フラグ
var useCureItemFg= false;

// 発動対象外スキルタイプ
var noUseSkillName =	[];
var useSkillName1  =	[];
var useSkillName2  =	[];
var useSkillName3  =	[];
var useSkillName4  =	[];
var useSkillName5  =	[];
var useSkillName6  =	[];
var useSkillName7  =	[];
var skillConsoleOut=false;

var maltiBossNames=[];

// 優先ターゲント
var gbfToolRaidTarget	=	[];

// フレンド選択
var friendSelFgLoc	= false;

var friendSelFg		= true;

$("body").css("font-family","メイリオ");
//$("body").css("overflow","hidden");
setInterval(function(){turnWaitCancel();},10);
setInterval(function(){
	// オプション取得
	getOptions();
	// フォント処理
	setWindowFont();
	// ズーム設定
	setWindowZoom();
	// FPS設定
	setWindowFps();

	// 実行しない
	if (gbfToolCommnFg==0) {
		return false;
	}
	
//	$("<script>").html("alert('aaaaa');").appendTo("head");
//	$.ajax({
//	type: 'GET',
//	url: 'http://game.granbluefantasy.jp/party/update_equipment',
//	dataType: 'json',
//	data:{},
//	success: function(json){
//		alert("aaaa "+json['list']);
//	}
//});
//	$.ajax({
//		type: 'GET',
//		url: 'http://game.granbluefantasy.jp/casino/jackpot',
//		dataType: 'json',
//		success: function(json){
//			alert("aaaa "+json['list']);
//		}
//	});
//

	if (getStrMatch(String($("div.prt-error-infomation").find("p").html()), "エラーが発生しました。")) {
		if (getStrMatchFront(location.hash,"#raid")) {
			setTimeout("pageReload()",1000);
		} else {
			setTimeout("goMypage()",3000);
		}
		return false;
	}

	var nowStatus = getStatus();

	switch (nowStatus) {
		case STR_M_TOP:			// トップ画面
//			if (isGlobalMenu()) {
//				tap("#start");
//			}
			break;
		case STR_M_MYPAGE:		// マイページ
			getStaminaState();

			// 共闘モード
			if (MODE_KYOUTOU == gbfToolCommnMode) {
				location.href = "http://game.granbluefantasy.jp/#coopraid";
			}

			// マルチモード
			if (MODE_MALTI == gbfToolCommnMode) {
				location.href = "http://game.granbluefantasy.jp/#quest/assist";
			}

			if (gbfToolCommnMode==MODE_VAREN2){
				if (nowStamina >= 2) {
					location.href = "http://game.granbluefantasy.jp/#quest/supporter/702741/10";
				} else {
					setTimeout("pageReload()",60000);
				}
			}
			
			// クエスト周回モード
			if (MODE_SHUUKAI == gbfToolCommnMode) {
				if ("" == questUrl || "" == questAp) {return false;}
				if (nowStamina >= Number(questAp)) {
				//	location.href = "http://game.granbluefantasy.jp/#quest/supporter/" + questUrl;
				//	location.href = "http://game.granbluefantasy.jp/#event/teamraid009/supporter/703031/1";
					location.href = "http://game.granbluefantasy.jp/" + questUrl;
				} else {
					setTimeout("pageReload()",60000);
				}
			}
			
			break;
		case STR_V_QUE:			// クエスト
			quest();
			// 共闘モード
			// マルチモード
			if (MODE_KYOUTOU == gbfToolCommnMode ||
				MODE_MALTI   == gbfToolCommnMode 	) {
				setTimeout("goMypage()",3000);
			}
			break;
		case STR_V_QUETOP:		// クエストトップ
			// クエスト周回モード
			// 共闘モード
			// マルチモード
			if (MODE_SHUUKAI == gbfToolCommnMode ||
				MODE_KYOUTOU == gbfToolCommnMode ||
				MODE_MALTI   == gbfToolCommnMode 	) {
				setTimeout("goMypage()",3000);
			}
			break;
		case STR_V_RAID:		// RAID中
			raidMain();
			break;
		case STR_M_K_TOP:		// 共闘トップ
			// 共闘モード
			if (MODE_KYOUTOU == gbfToolCommnMode) {
				location.href = "http://game.granbluefantasy.jp/#coopraid/offer";
			}
			break;
		case STR_V_MULTI:		// マルチ
			maltiWait();
			break;
		case STR_M_K_OFFER:		// 入室処理
			// 共闘モード
			if (MODE_KYOUTOU == gbfToolCommnMode) {
				kyoutouNyushutsu();
			}
			break;
		case STR_M_K_ROOM:		// 共闘ルーム
			kyoutouRoom();
			break;
		case STR_M_SUPPO:		// サポーター選択
			selectSupporter();
			break;
		case STR_V_RESULT:		// 報酬画面
			raidResult();
			break;
	}
	
	if (gbfToolCommnMode==MODE_VAREN2){
		switch (nowStatus) {
		case STR_V_QUE:			// クエスト
		case STR_V_QUETOP:		// クエストトップ
		case STR_M_K_TOP:		// 共闘トップ
		case STR_M_K_OFFER:		// 入室処理
		case STR_M_K_ROOM:		// 共闘ルーム
		case 0:
			setTimeout("goMypage()",1000);
		}
	}
	
	if (gbfToolCommnMode==MODE_KYOUKA) {
		sendKyouka();
	}
},1000);

//setInterval(function(){
//	readToLocal("status.txt");
//	if (writeStr == readStr ) {
//		print("OK");
//	} else {
//		print("NG");
//	}
//	sleep(1);
//	getStaminaState();
//	//print(isGlobalMenu());
//},3000);

// ステータス
function getStatus() {
	var result = 0

	if (location.hash == "#mypage") {
		result = STR_M_MYPAGE;
	} else if ($("#start")[0]) {
		result = STR_M_TOP;
	} else if (getStrMatchFront(location.hash,"#raid")) {
		result = STR_V_RAID;
	} else if (getStrMatchFront(location.hash,"#result")) {
		result = STR_V_RESULT;
	} else if (location.hash == "#coopraid") {
		result = STR_M_K_TOP;
	} else if (location.hash == "#coopraid/offer") {
		result = STR_M_K_OFFER;
	} else if (getStrMatch(location.hash,"#coopraid/room/")) {
		result = STR_M_K_ROOM;
	} else if (getStrMatch(location.hash,"#quest/supporter")) {
		result = STR_M_SUPPO;
	} else if (getStrMatch(location.hash,"#event/teamraid009/supporter/")) {
		result = STR_M_SUPPO;
	} else if (location.hash == "#quest") {
		result = STR_V_QUETOP;
	} else if (getStrMatchFront(location.hash,"#quest/assist")) {
		result = STR_V_MULTI;
	} else if (getStrMatchFront(location.hash,"#quest")) {
		result = STR_V_QUE;
	} else if (getStrMatchFront(location.hash,"#casino/game/poker/")) {
		result = STR_K_PK;
	} else {
		// 共闘モード
		if (MODE_KYOUTOU == gbfToolCommnMode) {
			goMypage();
		} else if (MODE_SHUUKAI == gbfToolCommnMode) {
			goMypage();
		}
	}
	return result;
}

// スタミナ状態取得
function getStaminaState() {
	var divTxtStaminaValue	= $("div.txt-stamina-value");
	var divPrtUserBpValue	= $("div.prt-user-bp-value");
	if (divTxtStaminaValue[0]) {
		staminaVal = divTxtStaminaValue.attr("title").split("/");
		nowStamina	= staminaVal[0];
		maxStamina	= staminaVal[1];
		nowBp		= divPrtUserBpValue.attr("title");
	} else {
		return false;
	}
	return true;
}

// マイページ遷移
function goMypage() {
	location.href = "http://game.granbluefantasy.jp/#mypage";
}
// 共闘ページ遷移
function goKyoutou() {
	location.href = "http://game.granbluefantasy.jp/#coopraid/";
}

// グローバル画面の存在有無
function isGlobalMenu() {
	var popGlobalMenu = $("div.pop-global-menu");
	if (popGlobalMenu[0]) {
		if (popGlobalMenu.hasClass("slide_pop")) {
			return true;;
		}
	} else {
		return false;
	}
	return false
}

function initRaidMain() {
//	attackFg = false;

	if ($("#gbfToolDiv_mastarRaidMain").size() == 0) {
		if ($("#gbfToolScript").size() == 0) {
			$("<script>")
				.attr("id","gbfToolScript")
				.appendTo("body");
		}

		$("body")
			.append(getGbfToolHidden("gbfToolDiv_mastarRaidMain"))
			.append(getGbfToolHidden("gbfToolDiv_battle_count"))
			.append(getGbfToolHidden("gbfToolDiv_battle_total"))
			.append(getGbfToolHidden("gbfToolDiv_turn"))
			.append(getGbfToolHidden("gbfToolDiv_attacking"))
			.append(getGbfToolHidden("gbfToolDiv_temporary_small"))
			.append(getGbfToolHidden("gbfToolDiv_temporary_large"))
			.append(getGbfToolHidden("gbfToolDiv_boss_mode_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_mode_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_mode_3"))
			.append(getGbfToolHidden("gbfToolDiv_boss_gauge_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_gauge_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_gauge_3"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_hp_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_hp_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_hp_3"))
			.append(getGbfToolHidden("gbfToolDiv_boss_hp_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_hp_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_hp_3"))
			.append(getGbfToolHidden("gbfToolDiv_boss_recast_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_recast_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_recast_3"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_recast_1"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_recast_2"))
			.append(getGbfToolHidden("gbfToolDiv_boss_max_recast_3"))
		;
	}
}
function setRaidBossStatus() {
	var scriptStr="";

	scriptStr	=		""
					+	"stage.gGameStatus.attack_count = 2;"
					+	"$('input[id^=\"gbfToolDiv_\"]').val('');"
					+	"$('#gbfToolDiv_raid_id').val(stage.pJsnData.raid_id);"
					+	"$('#gbfToolDiv_battle_count').val(stage.pJsnData.battle.count);"
					+	"$('#gbfToolDiv_battle_total').val(stage.pJsnData.battle.total);"
					+	"$('#gbfToolDiv_turn').val(window.stage.gGameStatus.turn);"
					+	"$('#gbfToolDiv_attacking').val(window.stage.gGameStatus.attacking);"
					+	"$('#gbfToolDiv_temporary_small').val(window.stage.gGameStatus.temporary.small);"
					+	"$('#gbfToolDiv_temporary_large').val(window.stage.gGameStatus.temporary.large);"
					+	"$.each(window.stage.gGameStatus.boss.param,function(i, val) {"
					+	"	$('#gbfToolDiv_boss_mode_'+(i+1)).val(stage.gGameStatus.bossmode.looks.mode[i]);"
					+	"	$('#gbfToolDiv_boss_gauge_'+(i+1)).val(stage.gGameStatus.bossmode.looks.gauge[i]);"
					+	"	$('#gbfToolDiv_boss_max_hp_'+(i+1)).val(val.hpmax);"
					+	"	$('#gbfToolDiv_boss_hp_'+(i+1)).val(val.hp);"
					+	"	$('#gbfToolDiv_boss_recast_'+(i+1)).val(val.recast);"
					+	"	$('#gbfToolDiv_boss_max_recast_'+(i+1)).val(val.recastmax);"
					+	""
					+	"});"
					;

	sendDirectScript(scriptStr);
}
function a() {
	sendDirectScript("window.Game.view.setupView.Attack();");
}
var lastSummonInfo="";
function useSummon(summonId) {
	summonInfo	=	$("#gbfToolDiv_raid_id").val()
				+	"_"
				+	$("#gbfToolDiv_turn").val()
				+	"_"
				+	summonId;
	if (lastSummonInfo != summonInfo) {
		sendDirectScript(
				"Game.view.setupView.Attack("
			+	"	'summon_result', "
			+	"	{"
			+	"		raid_id:stage.pJsnData.raid_id,"
			+	"		target_id:stage.gGameStatus.target,"
			+	"		lock: stage.gGameStatus.lock,"
			+	"		summon_id: '" + summonId + "'"
			+	"	}"
			+	");"
		);
		lastSummonInfo	=	$("#gbfToolDiv_raid_id").val()
						+	"_"
						+	$("#gbfToolDiv_turn").val()
						+	"_"
						+	summonId;
	}
}
var lastCureInfo="";
function useCureItem(posId) {
	if (!useCureItemFg) {
		return false;
	}
	cureInfo	=		$("#gbfToolDiv_raid_id").val()
					+	"_"
					+	$("#gbfToolDiv_turn").val();
	if (lastCureInfo != cureInfo) {
		if (Number($("#gbfToolDiv_temporary_small").val())>0) {
			scriptStr	=		""
							+	"Game.view.setupView.Attack("
							+	"	'temporary_item_result',"
							+	"	{"
							+	"		raid_id			:Game.view.setupView.pJsnData.raid_id,"
							+	"		character_num	:Game.view.setupView.pJsnData.formation[" + posId + "]"
							+	"	}"
							+	");"
							;
			sendDirectScript(scriptStr);
		}
		lastCureInfo	=	$("#gbfToolDiv_raid_id").val()
						+	"_"
						+	$("#gbfToolDiv_turn").val();
	}
}
function popRemove() {
	sendDirectScript("Game.view.setupView.popRemove();");
}
function sendDirectScript(scriptStr) {
	if ($("#gbfToolScript").size() == 0) {
		$("<script>")
			.attr("id","gbfToolScript")
			.appendTo("body");
	}
	$("#gbfToolScript").html(scriptStr);
	$("#gbfToolScript").remove();
}

function getGbfToolHidden(idStr) {
	var gbfToolHiddenAttr = {};
	gbfToolHiddenAttr["type"]	= "hidden";
	gbfToolHiddenAttr["id"]		= idStr;
	gbfToolHiddenAttr["value"]	= "1";
	return $("<input>").attr(gbfToolHiddenAttr);
}


function turnWaitCancel() {
	if ("直前のターンを処理中です" == $("#pop div.txt-popup-body").html()	&&
		$("#pop div.btn-usual-ok").attr("oshita") == undefined) {
		$("#pop div.btn-usual-ok").attr("oshita","1");
		tap($("#pop div.btn-usual-ok"));
	}
}
// マルチ待機
function maltiWait() {
	if (MODE_MALTI != gbfToolCommnMode) {
		return false;
	}

	if (	$("#prt-multi-list div.ico-enter").attr("gbfTochi") == undefined &&
			$("#prt-multi-list div.ico-enter").size() > 0) {
		$("#prt-multi-list div.ico-enter").attr("gbfTochi","1");
		location.href="http://game.granbluefantasy.jp/#raid_multi/"+$("#prt-multi-list div.ico-enter").parent().parent().parent().attr("data-raid-id");
		return false;
	} else {
		if ($("#prt-multi-list div.ico-enter").attr("gbfTochi") == "1") {
			return false;
		}
	}

	if ($("#prt-unclaim-list").children().size()==0) {
		tap($("#tab-unclaimed"));
		tap($("#tab-multi"));
	}

	if ($("#gbfToolDiv_maltiWait").size() == 0) {
		$("body")
			.append(getGbfToolHidden("gbfToolDiv_maltiWait"))
			.append(getGbfToolHidden("gbfToolDiv_now_battle_point"))
		;
	}
	sendDirectScript(
			""
		+	"$('input[id^=\"gbfToolDiv_\"]').val('');"
		+	"$('#gbfToolDiv_now_battle_point').val(Game.view.status.toJSON().status.now_battle_point);"
	);

	if ($("#prt-unclaim-list").children().size()==0) {
		return false;
	}

	// 未確認確認
	$.each($("#prt-unclaim-list div.btn-multi-raid"),function() {
		tap($(this));
		return false;
	});

	var reloadFg=true;
	var maltiDiv=null;
	$.each($("#prt-multi-list div.btn-multi-raid"), function(i, val) {
		var bossChkFg=false;
		$.each(maltiBossNames,function(j,str) {
			if (chkBlank(str) &&
				getStrMatch($(val).attr("data-chapter-name"),str)) {
				bossChkFg=true;
			}
		});
		if (!bossChkFg) {return true;}
		if ($("#gbfToolDiv_now_battle_point").val() >= $(this).attr("data-bp")) {
			reloadFg=false;
			if (maltiDiv == null ||
				maltiDiv.find("div.prt-raid-gauge-inner").css("width").replace(/[^0-9]/g, "") < $(this).find("div.prt-raid-gauge-inner").css("width").replace(/[^0-9]/g, "")) {
				maltiDiv = $(this);
			}
		}
	});
	if (reloadFg) {
		if ($("#gbfToolDiv_now_battle_point").val() != "0") {
			setTimeout("pageReload()",10000);
		} else {
			setTimeout("pageReload()",60000);
		}
	} else {
		tap($(maltiDiv));
	}
}
// バトル中
function raidMain() {
	var continueFg = true;
	var ougiFgK	= true;		// フルチェインフラグ
	var ougiFg	= true;		// 奥義実行フラグ
	var ougi	= [];
	var reloadFg= true;
	var bossLv	= 0;
	turnWaitCancel();

	initRaidMain();

	setRaidBossStatus();

	if (gbfToolCommnMode==MODE_VAREN ||
		gbfToolCommnMode==MODE_VAREN2) {
		ougiFg = false;
		summonFg=false;
	}

	if ($("div.btn-targeting+.lock-on1").size()==0) {
		$("div.btn-targeting").each(function() {
			if (bossLv==0) {
				bossLv=Number($(this).find("div.name").html().slice(0,5).replace(/[^0-9]/g, ""));
			}
			for (i=0; i<gbfToolRaidTarget.length; i++) {
				if (getStrMatch($(this).find("div.name").html(), gbfToolRaidTarget[i])) {
					$(this).addClass("lock-on1");
					tap($(this));
				}
			}
		});
	}
	
	// クリア
	if ($("div.prt-command-end").css("display") != "none") {
		tap($("div.prt-command-end").find("div.btn-result"));
		return false;
	}
	if ($("#pop div.pop-rematch-fail")[0]) {
		tap($("#pop").find("div.btn-usual-ok"));
		return false;
	}

	// キャラ情報
	for (i=0; i<4; i++) {
		var charaDiv = $("div.prt-command-chara").get(i);
		var charHp	= Number($(charaDiv).find("div.txt-hp-value").html());
		var charPos	= Number($(charaDiv).attr("pos"));
		if (charHp > 0) {reloadFg = false;}
		if ($(charaDiv).find("div.txt-hp-value").attr("color")	=="red" &&
			$(charaDiv).find("div.txt-hp-value").html()			!="0"	) {
			if ($("#gbfToolDiv_attacking").val()=="0") {
				useCureItem(charPos);
			}
		}
		ougi[i] = Number($($("div.prt-command-chara")[i]).find("div.txt-percent").html());
		if ((ougi[i]+(10*i))<100) {ougiFgK=false;}
	}
	if (reloadFg) {
		if ($("div.btn-revival").css("display") == "block" ||
			$("div.prt-tips").css("display") == "block" ) {
			setTimeout("pageReload()",5000);
			return false;
		}
	}

	// 読み込み待ち
	if (!$("div.btn-attack-start").hasClass("display-on")) {
		return false;
	}

	// 救援
	var popStartAssist	= $("div.pop-start-assist");
	var popRaidAssist	= $("div.pop-raid-assist");
	if (popRaidAssist[0]) {
		tap(popRaidAssist.find("div.btn-usual-ok"));
		return false;
	}
	if (popStartAssist[0]) {
		if (kyuuenFg) {
			popStartAssist.find("div.prt-select-assist").find(".prt-box").each(function(ii, obj) {
				if ($(this).find("div.txt-remain")[0]) {
					tap(popStartAssist.find("div.btn-usual-cancel"));
					return false;
				}
				if ($(this).find("div.btn-check").attr("active") != kyuuenSt[ii]) {
					tap($(this).find("div.btn-check"));
				}
				if ($(this).find("div.btn-check").attr("active") != kyuuenSt[ii]) {
					continueFg = false;
				}
			});
			if (!continueFg) return false;
			tap(popStartAssist.find("div.btn-usual-text"));
		} else {
			popRemove();
		}
	}
	// チャット（スタンプ）
	if (firstChatFg) {
		var btnChat = $("div.btn-chat");
		var popChat = $("#pop");
		if ( btnChat[0] && btnChat.find("div.ico-attention")[0] &&
			 !popChat.find("div.pop-chat")[0] &&
			 btnChat.hasClass("display-on") && btnChat.find("div.ico-attention").css("display") == "block") {
			tap(btnChat);
		}
		if (popChat.find("div.pop-chat")[0]) {
			if (btnChat.find("div.ico-attention").css("display") == "block") {
				tap(popChat.find("div.pop-chat").find(".lis-stamp").get(1));
			} else {
				tap("#pop div.btn-usual-close");
			}
		}
	} else {
		if ($("#pop div.btn-usual-close")[0]) {
			tap($("#pop").find("div.btn-usual-close"));
		}
	}

	// タイムアップ
	if ($("#pop div.pop-time-up")[0]) {
		tap($("#pop").find("div.btn-usual-ok"));
	}

	// バトルスピード
	if ($("div.btn-change-speed").attr("fps") != "24"){
		tap("div.btn-change-speed");
	}

	if (	$("#gbfToolDiv_battle_count").val() != $("#gbfToolDiv_battle_total").val() &&
			$("#gbfToolDiv_battle_count").val() == "1") {
		summonFg=false;
	} else {
		summonFg=true;
	}

	// 召喚情報
	if (summonFg && attackFg) {
		$("div.lis-summon").each(function(i, element){
			if ($(this).hasClass("on")) {
				useSummon($(this).attr("summon-id"));
				return false;
			}
		});
	}

	if (skillConsoleOut) {
		for (i=0; i<4; i++) {
			$($("div.prt-command-chara").get(i)).find(".lis-ability").each(function() {
				var skillObj=$(this);
				if (	skillObj.hasClass("btn-ability-unavailable") ||
						skillObj.hasClass("btn-ability-available")		){
					var skillDiv  = $(skillObj.find("div").get(0));
					var skillType = skillDiv.attr("type");
					var skillName = skillDiv.attr("ability-name").replace(/＋/g, '').replace(/I/g, '');
					print("キャラ"+(i+1)+"【"+skillName+"】: "+skillType);
				}
			});
		}
	}

	var zakoBossFg=false;
	if (MODE_KYOUTOU == gbfToolCommnMode	&&
		bossLv < 50) {
		zakoBossFg=true;
	}

	$("div.prt-command-chara").each(function(i) {
		$(this).find("div.lis-ability").attr("gbfTool_pos",i).attr("gbfToolSkFg","0");
	});
	// スキル情報
	var tapSkillDiv		= null;
	var tmpSkillDiv		= null;
	var lisAbility		= $("div.prt-command-chara").find("div.lis-ability");
	lisAbility.each(function() {
		var skillObj=$(this);
		if (	skillObj.hasClass("btn-ability-unavailable") ||
				skillObj.hasClass("btn-ability-available")		){
			var skillDiv  = $(skillObj.find("div").get(0));
			var skillType = skillDiv.attr("type");
			var skillName = skillDiv.attr("ability-name").replace(/＋/g, '').replace(/I/g, '');
			
			noUseFg=false;
			$.each(noUseSkillName, function(iii, val) {
				var usn=val.replace(/@/g, '');
				if ("@"==val.slice(0,1)) {
					if (chkBlank(val) && getStrMatchAll(skillName, val)) {
						noUseFg=true;
						return false;
					}
				} else {
					if (chkBlank(usn) && getStrMatch(skillType, usn)) {
						noUseFg=true;
						return false;
					}
				}
			});
			var gbfToolSkillChkPos=Number(skillObj.attr("gbfTool_pos"));
			var gbfToolOugiChkFg=false;
			if ((Number($($("div.prt-command-chara")[gbfToolSkillChkPos]).find("div.txt-percent").html())+(10*gbfToolSkillChkPos))>=100) {
				gbfToolOugiChkFg=true;
			}
			$.each(useSkillName6, function(iii, val) {
				var usn=val.replace(/@/g, '');
				if ("@"==val.slice(0,1)) {
					if (gbfToolOugiChkFg && chkBlank(val) && getStrMatchAll(skillName, val)) {
						noUseFg=true;
						return false;
					}
				} else {
					if (gbfToolOugiChkFg && chkBlank(usn) && getStrMatch(skillType, usn)) {
						noUseFg=true;
						return false;
					}
				}
			});
			if (noUseFg) {
				skillObj.attr("gbfNoUseFg","1");
			} else {
				skillObj.attr("gbfNoUseFg","0");
			}
		}
	});

	// 最優先
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName1);
	if (tapSkillDiv == null) {
		tapSkillDiv = tmpSkillDiv;
	}

	// ピンチ時
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName7);
	if (tapSkillDiv == null) {
		tapSkillDiv=tmpSkillDiv;
		if (tapSkillDiv!=null) {
			var healTarget=-1;
			for (i=0; i<4; i++) {
				var charaDiv = $("div.prt-command-chara").get(i);
				if ($(charaDiv).find("div.txt-hp-value").attr("color")	=="red" &&
					$(charaDiv).find("div.txt-hp-value").html()			!="0"	) {
					healTarget=charPos;
					break;
				}
			}
			if (healTarget!=-1) {
				if ($(tapSkillDiv.find("div").get(0)).attr("ability-pick")=="2"&&
					$("div.prt-wrapper").css("display") == "block" &&
					$("div.prt-wrapper").find("div.txt-select-chara").html() == String.fromCharCode(12461,12515,12521,12463,12479,12540,12434,36984,25246,12375,12390,12367,12384,12373,12356,12290)) {
					//tap($("div.prt-wrapper").find("div.lis-character"+healTarget));
				}
			} else {
				tapSkillDiv = null;
			}
		}
	}

	// 奥義発動時
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName5);
	if (!zakoBossFg && tapSkillDiv == null) {
		if (ougiFg && ougiFgK) {
			tapSkillDiv = tmpSkillDiv;
		}
	}

	// チャージ有
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName2);
	if (!zakoBossFg && tapSkillDiv == null) {
		if ($("#gbfToolDiv_boss_recast_1").val() != $("#gbfToolDiv_boss_max_recast_1").val()) {
			tapSkillDiv = tmpSkillDiv;
		}
	}

	// 敵必殺時
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName3);
	if (!zakoBossFg && tapSkillDiv == null) {
		if (	$("#gbfToolDiv_boss_recast_1").val()	== "1"	&&
				$("#gbfToolDiv_boss_mode_1").val()		!= "3"		) {
			tapSkillDiv = tmpSkillDiv;
		}
	}

	// 敵ブレイク時
	tmpSkillDiv = getUseSkill(lisAbility, useSkillName4);
	if (!zakoBossFg && tapSkillDiv == null) {
		if ($("#gbfToolDiv_boss_mode_1").val()	== "3"	) {
			tapSkillDiv = tmpSkillDiv;
		}
	}
	
	// 通常
	if (!zakoBossFg && tapSkillDiv == null) {
		lisAbility.each(function() {
			if (	$(this).attr("gbfNoUseFg") == "0" &&
					$(this).attr("gbfToolSkFg") != "1" &&
					$(this).hasClass("btn-ability-available")	){
				tapSkillDiv=$(this);
				return false;
			}
		});
	}

	if ($("#gbfToolDiv_battle_count").val() != $("#gbfToolDiv_battle_total").val()) {
		tapSkillDiv=null;
		ougiFg=false;
	}

	if (	$("div.prt-ability-stamped").size() > 0	&&
			$("div.prt-ability-stamped").css("display") == "block"	&&
			getStrMatch($("div.prt-ability-stamped").html(),String.fromCharCode(12450,12499,12522,12486,12451,20351,29992,19981,21487,29366,24907,12398,12383,12417))) {
		skillDisableTurnNum	=	Number($("#gbfToolDiv_turn").val());
	}

	if (skillDisableTurnNum == Number($("#gbfToolDiv_turn").val())) {
		skillUseFg = false;
	}

	if (attackFg && skillUseFg && tapSkillDiv!=null) {
		tap($(tapSkillDiv));
		return false;
	}

//	var execSkillFg	= false;
//	var skillList1	= [];
//	var skillList2	= [];

//	$("div.prt-command-chara").find(".lis-ability").each(function() {
//		var skillObj=$(this);
//		if (	skillObj.hasClass("btn-ability-unavailable") ||
//				skillObj.hasClass("btn-ability-available")		){
//			var skillDiv  = $(skillObj.find("div").get(0));
//			var skillType = skillDiv.attr("type");
//			var skillName = skillDiv.attr("ability-name").replace(/＋/g, '').replace(/I/g, '');
//			// 使用可能か
//			if (skillObj.hasClass("btn-ability-available")) {
//				var breakFg=false;
//				$.each(noUseSkillType, function(iii, val) {
//					if (chkBlank(val) && getStrMatch(skillType, val)) {
//						breakFg=true;
//						return false;
//					}
//				});
//				if (breakFg) return true;
//				$.each(noUseSkillName, function(iii, val) {
//					if (chkBlank(val) && getStrMatchAll(skillName, val)) {
//						breakFg=true;
//						return false;
//					}
//				});
//				if (breakFg) return true;
//				$.each(fiUseSkillType, function(iii, val) {
//					if (chkBlank(val) && getStrMatch(skillType, val)) {
//						skillList1[iii]=skillObj;
//						breakFg=true;
//						return false;
//					}
//				});
//				if (breakFg) return true;
//				$.each(useSkillName1, function(iii, val) {
//					if (chkBlank(val) && getStrMatchAll(skillName, val)) {
//						skillList1[iii+20]=skillObj;
//						breakFg=true;
//						return false;
//					}
//				});
//				if (breakFg) return true;
//				var seUseSkillfindFg=false;
//				$.each(seUseSkillType, function(iii, val) {
//					if (chkBlank(val) && getStrMatch(skillType, val)) {
//						seUseSkillfindFg=true;
//						if ($("#gbfToolDiv_boss_recast_1").val() != $("#gbfToolDiv_boss_max_recast_1").val()) {
//							skillList2[iii+30]=skillObj;
//							breakFg=true;
//							return false;
//						}
//					}
//				});
//				if (breakFg) return true;
//				$.each(useSkillName2, function(iii, val) {
//					if (chkBlank(val) && getStrMatchAll(skillName, val)) {
//						seUseSkillfindFg=true;
//						if ($("#gbfToolDiv_boss_recast_1").val() != $("#gbfToolDiv_boss_max_recast_1").val()) {
//							skillList2[iii+40]=skillObj;
//							breakFg=true;
//							return false;
//						}
//					}
//				});
//				if (breakFg) return true;
//				$.each(caUseSkillType, function(iii, val) {
//					if (chkBlank(val) && getStrMatch(skillType, val)) {
//						seUseSkillfindFg=true;
//						if ($("#gbfToolDiv_boss_recast_1").val()	== "1"	&&
//							$("#gbfToolDiv_boss_mode_1").val()		!= "3"		) {
//							skillList2[iii+50]=skillObj;
//							breakFg=true;
//							return false;
//						}
//					}
//				});
//				if (breakFg) return true;
//				$.each(useSkillName3, function(iii, val) {
//					if (chkBlank(val) && getStrMatchAll(skillName, val)) {
//						seUseSkillfindFg=true;
//						if ($("#gbfToolDiv_boss_recast_1").val()	== "1"	&&
//							$("#gbfToolDiv_boss_mode_1").val()		!= "3"		) {
//							skillList2[iii+60]=skillObj;
//							breakFg=true;
//							return false;
//						}
//					}
//				});
//				if (breakFg) return true;
//				if (getStrMatch(skillType, "fatigue_break")) {
//					seUseSkillfindFg=true;
//					if ($("#gbfToolDiv_boss_mode_1").val() == "3") {
//						tapSkillDiv=skillObj;
//						breakFg=true;
//						return false;
//					}
//				}
//				if (breakFg) return true;
//				if (!seUseSkillfindFg) {
//					skillList2[70]="";
//					skillList2[skillList2.length]=skillObj;
//				}
//			}
//		}
//	});

	// 奥義設定
	if (ougiFg && ougiFgK) {
		if ($("div.btn-lock").hasClass("lock1")) tap("div.btn-lock");
	} else {
		if ($("div.btn-lock").hasClass("lock0")) tap("div.btn-lock");
	}

	if (attackFg) {
		sendDirectScript("window.Game.view.setupView.popHideAbilityStamped();");
		// 攻撃
		tap($("div.btn-attack-start"));
		skillDisableTurnNum=-1;
	}
}
var skillDisableTurnNum=-1;

// クエスト処理
function quest() {
	// クエストモード
	if (MODE_QUEST != gbfToolCommnMode) {
		return false;
	}

	if ($("#pop").find("div").size() > 0) {
		if ($("#pop").find("div.btn-usual-ok")[0]) {
			tap($("#pop").find("div.btn-usual-ok").get(0));
			return false;
		}
	} else {
		// スキップ
		if ($("div.btn-skip")[0]) {
			tap($("div.btn-skip"));
		}
	}
	// 進む
	if ($("div.btn-command-forward")[0] &&
		!$("div.btn-command-forward").hasClass("disable") &&
		$("div.anim-title").css("display") == "none") {
		tap($("div.btn-command-forward"));
	}

}

// 報酬獲得
function raidResult() {

	if (gbfToolCommnMode==MODE_VAREN||gbfToolCommnMode==MODE_VAREN2) {
		reidResultDungeon();
		return false;
	}
	if ("このバトルで獲得できる報酬はありません。" == $("div.txt-empty-notice").html()) {
		location.href = "http://game.granbluefantasy.jp/#mypage";
		return false;
	}

	// 経験値
	if ($("#pop div.pop-exp")[0]) {
		tap("#pop div.btn-usual-ok");
	}
	// 共闘モード
	if (MODE_KYOUTOU != gbfToolCommnMode || 
		MODE_MALTI   != gbfToolCommnMode	) {
		if (getItemShowFg == 1) {
			return false;
		}
	}
	
	// ルームへ
	if ($("div.cnt-result").find("div.prt-button-area").find("div.btn-control").get(0)) {
		tap($("div.cnt-result").find("div.prt-button-area").find("div.btn-control").get(0))
	}

	// バレンタイン
	reidResultDungeon();
}

// バレンタイン
function reidResultDungeon(){
	if ($("#pop div.prt-popup-footer")[0]) {
		if (gbfToolCommnMode==MODE_VAREN) {
			tap($("div.btn-go"));
		} else {
			if ($("#pop div.prt-popup-header").html()=="終了してPP獲得") {
				tap($("#pop div.quest-end"));
			} else if($("#pop div.prt-popup-header").html()=="NEXT BATTLE") {
				tap($("div.btn-return"));
			} else if($("#pop div.prt-popup-header").html()=="クエスト終了") {
				tap($("div.btn-control"));
			} else if($("#pop div.prt-popup-header").html()=="フレンド申請") {
				tap($("div.btn-usual-cancel"));
			}
		}
		return false;
	}
	if ($("div.btn-dungeon")[0]) {
		tap($("div.btn-dungeon"));
	}
}

function getUseSkill(lisAbility, useSkillName) {
	var result=null;
	$.each(useSkillName, function(iii, val) {
		if (chkBlank(val)) {

			var usn=val.replace(/@/g, '');
			if ("@"==val.slice(0,1)) {
				lisAbility.each(function() {
					if ($(this).attr("gbfNoUseFg") == "0"){
						var skillDiv  = $($(this).find("div").get(0));
						var skillType = "";
						if (skillDiv.attr("type")!=undefined) {
							skillType = skillDiv.attr("type");
						}
						if ($(this).hasClass("btn-ability-available") && getStrMatch(skillType, usn)) {
							if (result==null) {
								result=$(this);
							}
							$(this).attr("gbfToolSkFg","1");
						}
					}
				});
			} else {
				lisAbility.each(function() {
					if ($(this).attr("gbfNoUseFg") == "0") {
						var skillDiv  = $($(this).find("div").get(0));
						var skillName = ""
						if (skillDiv.attr("ability-name")!=undefined) {
							skillName = skillDiv.attr("ability-name").replace(/＋/g, '').replace(/I/g, '');
						}
						if (getStrMatchAll(skillName, val)) {
							if ($(this).hasClass("btn-ability-available") && result==null) {
								result=$(this);
							}
							$(this).attr("gbfToolSkFg","1");
						}
					}
				});
			}
		}
	});
	return result;
}

// 共闘ルーム処理
var exitFg=false;
function kyoutouRoom() {
	if (MODE_KYOUTOU != gbfToolCommnMode) {
		return false;
	}
	var divPrt		= $("div.txt-guide");
	var divPrtTxt	= divPrt.text().replace(/(^\s+)|(\s+$)/g, "");
	
	var kyoutouOtuFg= false;
	var myStampYFg	= false;
	var myStampOFg	= false;
	var myStampFg	= false;
	var myName		= getMyName();
	
	if ("" == $("div.txt-count-down").html()) {
		return false;
	}
	
	// キャラデータ取得
	$("div.prt-member-area").each(function() {
		if (getMyName() == $(this).find("div.prt-member-name").html()) {
			if ($(this).find("div.prt-member-balloon").size()>0) {
				if (getStrMatchRear($(this).find("img.img-stamp").attr("src"), "stamp10.png")) {
					myStampOFg = true;
				}else if (getStrMatchRear($(this).find("img.img-stamp").attr("src"), "stamp4.png")) {
					myStampYFg = true;
				}
				myStampFg = true;
			}
		} else {
			if (getStrMatchRear($(this).find("img.img-stamp").attr("src"), "stamp10.png")) {
				kyoutouOtuFg = true;
			}
		}
	});
	// 共闘でお疲れ様が発せられた場合
	if (kyoutouOtuFg) {
		// 自分がおつかれスタンプを押していない場合
		if (!myStampOFg) {
			exitFg=true;
			kyoutouSendStamp(10);
		}
		if (exitFg){
			// ５秒後に退出
			kyoutouTaishutsu();
			exitFg=false;
		}
		return false;
	} else {
		// 自分がよろしくスタンプを押していない場合
		if (!myStampYFg && !myStampFg) {
			kyoutouSendStamp(4);
			return false;
		}
	}
	
	if (divPrt[0]) {
		if ("挑戦するクエストを設定してください。" == divPrtTxt) {
			setTimeout("pageReload()",5000);
			return false;
		} else if ("準備OKを宣言しました。クエストの開始を待ちましょう。" == divPrtTxt) {
			setTimeout("pageReload()",5000);
			return false;
		} else if ("準備が整ったら準備OKを宣言しましょう。" == divPrtTxt) {
			if ($("div.btn-execute-ready")[0]) {
				tap($("div.btn-execute-ready"));
				return false;
			}
		} else if ("サポーターを選択してください。" == divPrtTxt) {
			var btnMakeReadyLarge = $("div.btn-make-ready-large");
			if (btnMakeReadyLarge[0] && btnMakeReadyLarge.hasClass("not-ready")) {
				tap(btnMakeReadyLarge);
			}
		}
	}
}
// 入室処理
var kyoutouReloadFg=true;
function kyoutouNyushutsu() {
	if ($("#pop").find("div").size() > 0) {
		if ($("#pop").find("div.btn-usual-join")[0]) {
			kyoutouReloadFg=true;
			tap($("#pop").find("div.btn-usual-join").get(0));
			return false;
		}
		if ($("#pop").find("div.btn-usual-ok")[0]) {
			kyoutouReloadFg=true;
			tap($("#pop").find("div.btn-usual-ok").get(0));
			return false;
		}
	}
	if (kyoutouReloadFg) {
		tap($("div.btn-refresh-list"));
		kyoutouReloadFg=false;
		return false;
	}
	var tapFg = false;
	$("div.prt-wanted-room").each(function() {
		if (!getStrMatch($(this).find("div.txt-room-comment").text(),"順")) {
			if ($(this).find("div.prt-invite-type-1")[0]) {
				tap($(this));
				tapFg = true;
			}
		}
	});
	if (!tapFg) {
		kyoutouReloadFg=true;
	}
}

// 共闘退出処理
function kyoutouTaishutsu() {
	var btnLeaveRoom = $("div.btn-leave-room");
	if (btnLeaveRoom.size() > 0) {
		tap(btnLeaveRoom);
		if ($("#pop")[0]) {
			if ("退室確認"		== $("div.prt-popup-header").html()) {
				tap($("div.btn-leave"));
				return false;
			}
			if ("準備取り下げ"	== $("div.prt-popup-header").html()) {
				tap($("div.btn-usual-ok"));
				return false;
			}
		}
		if (btnLeaveRoom.hasClass("disable")) {
			tap($("div.btn-retraction-ready"));
			return false;
		}
	}
}

// 共闘ルームでスタンプを送信
//  4:よろしく
// 10:お疲れ様
function kyoutouSendStamp(stampId) {
	if ($("#pop")[0]) {
		if (undefined == $("div.prt-popup-header").html()) {
			if ($("div.btn-members-stamp")[0]) {
				tap($("div.btn-members-stamp"));
			}
		}
		if ("チャット(スタンプ)" == $("div.prt-popup-header").html()) {
			tap($("img[data-stamp-id=" + stampId + "]"));
		}
		if ("利用制限" == $("div.prt-popup-header").html()) {
			tap($("div.btn-usual-ok"));
		}
	}
}

// 自分の名前取得
function getMyName() {
	return $($("div.lis-member").get(0)).find("div.txt-name").html();
}

// サポーター選択
function selectSupporter() {

	// 共闘モード
	if ((MODE_KYOUTOU != gbfToolCommnMode &&
		 MODE_SHUUKAI != gbfToolCommnMode &&
		 MODE_MALTI   != gbfToolCommnMode &&
		 MODE_VAREN2  != gbfToolCommnMode)	&&
		(MODE_QUEST	 =  gbfToolCommnMode && !friendSelFgLoc)) {
		return false;
	}

	if (!$("#prt-type").find("div.selected").not(".unselected").hasClass("icon-supporter-type-"+ptZokusei)) {
		tap($("#prt-type").find("div.icon-supporter-type-"+ptZokusei));
		return false;
	} else {
		if ($("div.pop-deck").css("display") == "none") {
			if (friendSelFg) {
				tap($("div.prt-supporter-attribute").not(".disableView").find("div.btn-supporter"));				
			} else {
				tap($("div.prt-supporter-attribute").not(".disableView").find("div.btn-supporter").get().reverse());
			}
			return false;
		} else {
			tap($("div.btn-usual-ok"));
			return false;
		}
	}
}

function sendKyouka(){
	if (getStrMatch($("div.prt-head-current").html(),"強化")) {
		if ($("div.btn-recommend").size()>0) {
			tap($("div.btn-recommend"));
		} else {
			if ($("#pop div.prt-popup-header")[0]) {
				if ($("#pop div.prt-popup-header").html()=="素材確認") {
					tap($("#pop div.btn-usual-ok"));
				}
			} else {
				if ($("div.btn-synthesis").size()>0) {
					if ($("div.prt-order-bottom").attr("style")==undefined) {
						tap($("div.prt-order-bottom").find("div.btn-synthesis"));
					} else {
						if ($("div.btn-follow-again")[0]) {
							tap($("div.btn-follow-again"));
						}
					}
				}
			}
		}
	}
}

// ファイル出力関連
function writeFile(filename, content) {
	writeToLocalClear(filename);
	sleep(0.5);
	writeToLocal(filename, content);
}
function writeToLocal(filename, content) {
	function errorCallback(e) {print("Error: " + e.name);}
	function fsCallback(fs) {
		fs.root.getFile(filename, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				fileWriter.onerror = function(e) {
					print("Failed: " + e);
				};
				fileWriter.seek(0);
				var output = new Blob([content], {type: "text/plain"});
				fileWriter.write(output);
			}, errorCallback);
		}, errorCallback);
	}
	// クオータを要求する。PERSISTENTでなくTEMPORARYの場合は
	// 直接 webkitRequestFileSystem を呼んでよい
	webkitStorageInfo.requestQuota(TEMPORARY, 1024, webkitRequestFileSystem(TEMPORARY, 1024, fsCallback, errorCallback), errorCallback);
}
function writeToLocalClear(filename) {
	function errorCallback(e) {print("Error: " + e.name);}
	function fsCallback(fs) {
		fs.root.getFile(filename, {create: true}, function(fileEntry) {
			fileEntry.createWriter(function(fileWriter) {
				fileWriter.onerror = function(e) {
					print("Failed: " + e);
				};

				fileWriter.truncate(0);
			}, errorCallback);
		}, errorCallback);
	}
	// クオータを要求する。PERSISTENTでなくTEMPORARYの場合は
	// 直接 webkitRequestFileSystem を呼んでよい
	webkitStorageInfo.requestQuota(TEMPORARY, 1024, webkitRequestFileSystem(TEMPORARY, 1024, fsCallback, errorCallback), errorCallback);
}

function readToLocal(filename) {
	var data = "";
	var endFg = false;
	function errorCallback(e) {print("Error: " + e.name);}
	function fsCallback(fs) {
		fs.root.getFile(filename, {create: true}, function(fileEntry) {
			fileEntry.file(function(file) {
				var reader = new FileReader();
				reader.onloadend = function(e) {
					data = e.target.result;
					// 読込んだ値を設定する
					print("data:"+data);
					readStr = data;
					endFg = true;
				};
				reader.readAsText(file);
			}, errorCallback);
		}, errorCallback);
	}
	// クオータを要求する。PERSISTENTでなくTEMPORARYの場合は
	// 直接 webkitRequestFileSystem を呼んでよい
	webkitStorageInfo.requestQuota(TEMPORARY, 1024, webkitRequestFileSystem(TEMPORARY, 1024, fsCallback, errorCallback), errorCallback);
	while(endFg){
		sleep(1);
	}
}

function sleep( T ){
	var d1 = new Date().getTime();
	var d2 = new Date().getTime();
	while( d2 < d1+1000*T ){	//T秒待つ
		d2=new Date().getTime();
	}
	return; 
}

function print(printStr) {
	console.log(printStr);
}

function tap(sle) {
	var obj = $(sle);
	if ($(sle)[0]) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('tap',true,true,window,0,0,0,0,0,false,false,false,false,0,null);
		$(sle)[0].dispatchEvent(evt);
	}
}
// 前方一致検索を行います。
function getStrMatchFront(str1, str2) {
	var str = " " + str1;
	if (str.indexOf(" " + str2) !== -1) {
		return true;
	} else {
		return false;
	}
}
 
// 後方一致検索を行います。
function getStrMatchRear(str1, str2) {
	var str = str1 + " ";
	if (str.indexOf(str2 + " ") !== -1) {
		return true;
	} else {
		return false;
	}
}
 
// 完全一致検索を行います。
function getStrMatchAll(str1, str2) {
	var str = " " + str1 + " ";
	if (str.indexOf(" " + str2 + " ") !== -1) {
		return true;
	} else {
		return false;
	}
}
// 部分一致検索を行います。
function getStrMatch(str1, str2) {
	if(str1.indexOf(str2) != -1) {
		return true;
	} else {
		return false;
	}
}

function getWindowZoomValue() {
	chrome.runtime.sendMessage({action: "getLocalStorage"}, function(response) {
		if (response['windowZoom']) {
			windowZoom = response['windowZoom'];
		}
	});
}
function setWindowZoom() {
	if ("0.9"!=windowZoom) {
		//$("div[style*='zoom']"
		$("html").css("zoom", windowZoom);
	}
}
function setWindowFps() {
	var fpsChgFg=false;

	$.each(gbfToolFpsTarget,function(i,val){
		if (val=="*") {
			fpsChgFg=true;
			return false;
		}
		if (	chkBlank(val) &&
				getStrMatch(location.href,val)	) {
			fpsChgFg=true;
			return false;
		}
	});
	if (fpsChgFg) {
		sendDirectScript(
			"createjs.Ticker.setFPS(" + gbfToolFpsSetting + ")"
		);
	}
}
function getOptions() {
	chrome.runtime.sendMessage({action: "getLocalStorage"}, function(response) {
		gbfToolCommnFg		= response["gbfToolCommnFg"];
		gbfToolCommnMode	= response["gbfToolCommnMode"];
		getItemShowFg		= response["getItemShowFg"];
		windowZoom			= response["windowZoom"];
		questUrl			= response["questUrl"];
		questAp				= response["questAp"];
		pkBet				= response["pkBet"];
		ptZokusei			= response["ptZokusei"];
		summonFg			= responseToFlag(response, "summonFg");
		firstChatFg			= responseToFlag(response, "firstChatFg");
		noUseSkillName		= responseToArray(response, "noUseSkillName");
		useSkillName1		= responseToArray(response, "useSkillName1");
		useSkillName2		= responseToArray(response, "useSkillName2");
		useSkillName3		= responseToArray(response, "useSkillName3");
		useSkillName4		= responseToArray(response, "useSkillName4");
		useSkillName5		= responseToArray(response, "useSkillName5");
		useSkillName6		= responseToArray(response, "useSkillName6");
		useSkillName7		= responseToArray(response, "useSkillName7");
		skillConsoleOut		= responseToFlag(response, "skillConsoleOut");
		gbfToolFpsTarget	= responseToArray(response, "gbfToolFpsTarget");
		gbfToolFpsSetting	= response["gbfToolFpsSetting"];
		gbfToolFont			= response["gbfToolFont"];
		maltiBossNames		= responseToArray(response, "maltiBossNames");
		gbfToolRaidTarget	= responseToArray(response, "gbfToolRaidTarget");
		friendSelFg			= responseToFlag(response, "friendSelFg");
		useCureItemFg		= responseToFlag(response, "useCureItemFg");
		skillUseFg			= responseToFlag(response, "skillUseFg");
	});
}
function responseToFlag(res, key) {
	return (res[key]=="1")?true:false;
}
function responseToArray(res, key) {
	return chkBlank(res[key])?res[key].split(","):[];
}
function setWindowFont() {
	if (!chkBlank(gbfToolFont)) {
		defaultFont = $("body").css("font-family");
	}
	if (!chkBlank(gbfToolFont)) {
		gbfToolFont = defaultFont;
	}

	if ($("body").css("font-family") != gbfToolFont) {
		// メイン処理
		$("body").css("font-family",gbfToolFont);
	}
}
function getOption(keyStr) {
	var result = "";
	// ローカルストレージを取得するメッセージを送信し、
	// 取得したメッセージをalertする。
	chrome.runtime.sendMessage({action: "getLocalStorage"}, function(response) {
		console.log(keyStr);
		if (response[keyStr]) {
			result = response[keyStr];
		}
	});
	return result;
}
function pageReload() {
	location.reload();
}
function chkBlank(str)	{
	var strVal = new String(str);
	var retVal = false;
	if(strVal == "") {retVal=false;}else{retVal = true;}
	return retVal;
}
function zeroPadding(value, length){
    return new Array(length - ('' + value).length + 1).join('0') + value;
}
function getLogTime() {
	var result="";
	
	DD = new Date();
	Year = DD.getFullYear();
	Month = DD.getMonth() + 1;
	Day = DD.getDate();
	Hours = DD.getHours();
	Minutes = DD.getMinutes();
	Seconds = DD.getSeconds();
	result = zeroPadding(Year,4)+"/"+zeroPadding(Month,2)+"/"+zeroPadding(Day,2)+" "+zeroPadding(Hours,2)+":"+zeroPadding(Minutes,2)+":"+zeroPadding(Seconds,2);
	return result;
}