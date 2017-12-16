$(function(){
	if (localStorage["gbfToolCommnFg"] == 0) {
		$("#playStatus").css("background-image", "url(img/start.png)");
	} else {
		$("#playStatus").css("background-image", "url(img/stop.png)");
	}

	$('#windowZoom').val(localStorage["windowZoom"]);
	$('#windowZoomTxt').text(getWindowZoomTxt(localStorage["windowZoom"]));
	$('input[name="gbfToolCommnMode"]').val([localStorage["gbfToolCommnMode"]]);
	$('input[name="getItemShowFg"]').val([localStorage["getItemShowFg"]]);
	$('input[name="pkBet"]').val([localStorage["pkBet"]]);
	$('#questUrl').val(localStorage["questUrl"]);
	$('#questAp').val(localStorage["questAp"]);
	$('input[name="ptZokusei"]').val([localStorage["ptZokusei"]]);
	$("input[name='gbfToolFpsSetting']").val([localStorage["gbfToolFpsSetting"]]);

	$("#playStatus").attr("gbfToolCommnFg",localStorage["gbfToolCommnFg"]);
	$("#playStatus").on("click", function() {
		localStorage["gbfToolCommnFg"] = localStorage["gbfToolCommnFg"]==0?1:0;
		if (localStorage["gbfToolCommnFg"] == 0) {
			$("#playStatus").css("background-image", "url(img/start.png)");
		} else {
			$("#playStatus").css("background-image", "url(img/stop.png)");
		}
	});
	$("#windowZoom").change(function() {
		$('#windowZoomTxt').text(getWindowZoomTxt($(this).val()));
		localStorage["windowZoom"] = $(this).val();
	});
	$('input[name="gbfToolCommnMode"]').change(function() {
		localStorage["gbfToolCommnMode"] = $('input[name="gbfToolCommnMode"]:checked').val();
	});
	$('input[name="getItemShowFg"]').change(function() {
		localStorage["getItemShowFg"] = $('input[name="getItemShowFg"]:checked').val();
	});
	$('input[name="pkBet"]').change(function() {
		localStorage["pkBet"] = $('input[name="pkBet"]:checked').val();
	});
	$('#questUrl').on("blur", function() {
		localStorage["questUrl"] = $(this).val();
	})
	$('#questAp').on("blur", function() {
		localStorage["questAp"] = $(this).val();
	})
	$('input[name="ptZokusei"]').change(function() {
		localStorage["ptZokusei"] = $('input[name="ptZokusei"]:checked').val();
	});
	$("input[name='gbfToolFpsSetting']").change(function() {
		localStorage["gbfToolFpsSetting"] = $("input[name='gbfToolFpsSetting']:checked").val();
	});
});

function getWindowZoomTxt(val) {
	if (val == "0.9") {
		return "×";
	}
	return val;
}

// 6:バレ
// 7:バ集