$(function(){
	setInitDisp();
	setInitVal();
	setEvents();
});

function setInitDisp() {
	$("div.div00").width(150);
	$("div.div01").width(150);
	$("#btnRefresh").width(150);
//	$("div.hide").hide();
}

function setInitVal() {
	$("input[name='gbfToolCommnFg']").val([localStorage["gbfToolCommnFg"]]);
	$("#windowZoom").val(localStorage["windowZoom"]);
	$("#windowZoomTxt").text(getWindowZoomTxt(localStorage["windowZoom"]));
	$("#windowZoom").val(localStorage["windowZoom"]);
	$("#windowZoomTxt").text(getWindowZoomTxt(localStorage["windowZoom"]));
	$("input[name='gbfToolCommnMode']").val([localStorage["gbfToolCommnMode"]]);
	$("input[name='getItemShowFg']").val([localStorage["getItemShowFg"]]);
	$("input[name='pkBet']").val([localStorage["pkBet"]]);
	$("#questUrl").val(localStorage["questUrl"]);
	$("#questAp").val(localStorage["questAp"]);
	$("input[name='ptZokusei']").val([localStorage["ptZokusei"]]);
	$("input[name='summonFg']").val([localStorage["summonFg"]]);
	$("input[name='firstChatFg']").val([localStorage["firstChatFg"]]);
	$("input[name='skillConsoleOut']").val([localStorage["skillConsoleOut"]]);
	$("#questAp").val(localStorage["questAp"]);
	$("#noUseSkillName").val(localStorage["noUseSkillName"]);
	$("#useSkillName1").val(localStorage["useSkillName1"]);
	$("#useSkillName2").val(localStorage["useSkillName2"]);
	$("#useSkillName3").val(localStorage["useSkillName3"]);
	$("#useSkillName4").val(localStorage["useSkillName4"]);
	$("#useSkillName5").val(localStorage["useSkillName5"]);
	$("#useSkillName6").val(localStorage["useSkillName6"]);
	$("#useSkillName7").val(localStorage["useSkillName7"]);
	$("#gbfToolFpsTarget").val(localStorage["gbfToolFpsTarget"]);
	$("input[name='gbfToolFpsSetting']").val([localStorage["gbfToolFpsSetting"]]);
	$("#gbfToolFont").val(localStorage["gbfToolFont"]);
	$("#maltiBossNames").val(localStorage["maltiBossNames"]);
	$("#gbfToolRaidTarget").val(localStorage["gbfToolRaidTarget"]);
	$("input[name='friendSelFg']").val([localStorage["friendSelFg"]]);
	$("input[name='useCureItemFg']").val([localStorage["useCureItemFg"]]);
	$("input[name='skillUseFg']").val([localStorage["skillUseFg"]]);
}

function setEvents() {
	$("#btnRefresh").click(function() {
		setInitVal();
	});
	$("input[name='gbfToolCommnFg']").change(function() {
		localStorage["gbfToolCommnFg"] = $("input[name='gbfToolCommnFg']:checked").val();
	});
	$("#windowZoom").change(function() {
		$("#windowZoomTxt").text(getWindowZoomTxt($(this).val()));
		localStorage["windowZoom"] = $(this).val();
	});
	$("input[name='gbfToolCommnMode']").change(function() {
		localStorage["gbfToolCommnMode"] = $("input[name='gbfToolCommnMode']:checked").val();
	});
	$("input[name='getItemShowFg']").change(function() {
		localStorage["getItemShowFg"] = $("input[name='getItemShowFg']:checked").val();
	});
	$("input[name='pkBet']").change(function() {
		localStorage["pkBet"] = $("input[name='pkBet']:checked").val();
	});
	$("#questUrl").on("blur", function() {
		localStorage["questUrl"] = $(this).val();
	});
	$("#questAp").on("blur", function() {
		localStorage["questAp"] = $(this).val();
	});
	$("input[name='ptZokusei']").change(function() {
		localStorage["ptZokusei"] = $("input[name='ptZokusei']:checked").val();
	});
	$("input[name='summonFg']").change(function() {
		localStorage["summonFg"] = $("input[name='summonFg']:checked").val();
	});
	$("input[name='firstChatFg']").change(function() {
		localStorage["firstChatFg"] = $("input[name='firstChatFg']:checked").val();
	});
	$("#noUseSkillName,#useSkillName1,#useSkillName2,#useSkillName3,#useSkillName4,#useSkillName5,#useSkillName6,#useSkillName7").on("blur", function() {
		localStorage[this.id] = $(this).val();
	});
	$("#gbfToolFpsTarget,#gbfToolFont,#maltiBossNames,#gbfToolRaidTarget").on("blur", function() {
		localStorage[this.id] = $(this).val();
	});
	$("input[name='skillConsoleOut']").change(function() {
		localStorage["skillConsoleOut"] = $("input[name='skillConsoleOut']:checked").val();
	});
	$("input[name='gbfToolFpsSetting']").change(function() {
		localStorage["gbfToolFpsSetting"] = $("input[name='gbfToolFpsSetting']:checked").val();
	});
	$("input[name='friendSelFg']").change(function() {
		localStorage["friendSelFg"] = $("input[name='friendSelFg']:checked").val();
	});
	$("input[name='useCureItemFg']").change(function() {
		localStorage["useCureItemFg"] = $("input[name='useCureItemFg']:checked").val();
	});
	$("input[name='skillUseFg']").change(function() {
		localStorage["skillUseFg"] = $("input[name='skillUseFg']:checked").val();
	});
}

function getWindowZoomTxt(val) {
	if (val == "0.9") {
		return "×";
	}
	return val;
}
