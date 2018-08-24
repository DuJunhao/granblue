define(["backbone","model/content","view/content","view/popup","lib/jquery.tabs","collection/item/list-collection","collection/item/evolution-list-collection","model/token-data","model/data","model/user/status","model/sound","util/language-message"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=10,n=75,o=10,p=25,q=20,r=c.extend({isItemPage:!0,normal_item_list:null,evolution_weapon_list:null,evolution_summon_list:null,treasure_item_list:null,memorial_item_list:null,item_model:null,memorial_model:null,use_item_id:null,tempPopConfirm:null,firstFlg:!0,scrollTarget:"",events:{"tap #normal_item_tab":"selectItemTab","tap #skypiece_tab":"skypiece_fetch","tap #memorial_tab":"memorial_fetch","tap .prt-normal .lis-item:not(.btn-evolution-weapon, .btn-evolution-summon)":"popNormal","tap .btn-enhancement-weapon, .btn-enhancement-summon, .btn-enhancement-npc":"popEnhancementItem","tap .prt-treasure .lis-item":"popTreasure","tap .prt-memorial .lis-item":"popMemorial","tap #prt-others .lis-item":"popOtherItem","tap .btn-evolution-weapon":"popEvolutionWeapon","tap .btn-evolution-summon":"popEvolutionSummon","tap .btn-evolution-npc":"popEvolutionNpc","tap .prt-tickets .lis-item":"popTickets","tap #prt-target-list .lis-item":"popAllocation","tap .pop-normal .btn-usual-use":"party_check","tap .pop-actparty .btn-usual-use":"itemUseRequest","tap .pop-evolution-weapon .btn-usual-use":"evolutionWeapon","tap .pop-evolution-summon .btn-usual-use":"evolutionSummon","tap .pop-evolution-npc .btn-usual-use":"evolutionNpc","tap .pop-use-enhancement .btn-usual-use":"locationEnhancement","tap .pop-other-item .btn-usual-ok":"postUseOtherItem","tap .pop-other-item-result .btn-usual-close":"popRemoveListRefresh","tap .btn-usual-cancel, .btn-usual-close":"removePop","tap .btn-show-button":"slideButton","tap #btn-search":"checkSkyPiece","tap .pop-skypiece .btn-usual-ok":"locationQuest","tap .btn-skypiece":"getSkyPiece","tap .pop-get-skypiece .btn-usual-ok":"locationArchive","tap .pop-tickets-ng .btn-usual-ok":"removeTikets","change .pop-normal .num-set":"changeUseItemNum","tap .pop-memorial .btn-memorial-setting":"setMemorialSetting","tap .pop-addskill-weapon .btn-usual-ok":"locationAddSkillWeaponList","tap .pop-addskill-weapon .btn-usual-cancel":"popRemove","tap .btn-addskill-weapon":"popAddSkillWeapon","tap .prt-item-button .btn-item-tabs":"itemListTabs","tap .prt-item-filter-list .btn-pos-change":"changePosition","tap .prt-item-filter .btn-filter":"filterTreasure","tap .btn-weapon-skillplus":"popWeaponSkillpuls","tap .pop-treasure .btn-treasure-registration":"registrateTreasure","tap .prt-evolution-items .btn-npc-augument":"popNpcAugument","tap .prt-item-filter .btn-npc-augument":"popNpcAugument","tap .pop-npc-augument .btn-usual-ok":"locationEnhancement","tap .pop-npc-augument .btn-usual-cancel":"popRemove","tap .prt-evolution-items .btn-recycle-item":"popRecycleItem","tap .prt-item-filter .btn-recycle-item":"popRecycleItem","tap .pop-recycle-item .btn-usual-cancel":"popRemove"},initialize:function(a){this.content_bind(),this.active_tab=a.active_tab;var c=new b({controller:"item",action:"index"});this.listenToOnce(c,"sync",this.render_pre),c.fetch()},normal_item_fetch:function(){var a=this;this.normal_item_list=new f,this.normal_item_list.urlMethod="normal_item_list",this.stopListening(this.normal_item_list,"reset"),this.listenTo(this.normal_item_list,"reset",this.getUserStatus),this.normal_item_fetch=function(){a.normal_item_list.fetch({reset:!0})},this.normal_item_fetch()},getUserStatus:function(){var a=this;this.userStatusModel=new j,this.stopListening(this.userStatusModel,"sync"),this.listenToOnce(this.userStatusModel,"sync",this.normal_render),this.getUserStatus=function(){a.userStatusModel.fetch()},this.getUserStatus()},evolution_weapon_fetch:function(){var a=this;this.evolution_weapon_list=new g,this.evolution_weapon_list.rarity="0",this.evolution_weapon_list.target="1",this.evolution_weapon_list.item_type="2",this.evolution_weapon_list.list_flag="1",this.stopListening(this.evolution_weapon_list,"reset"),this.listenTo(this.evolution_weapon_list,"reset",this.evolution_summon_fetch),this.evolution_weapon_fetch=function(){a.evolution_weapon_list.fetch({reset:!0})},this.evolution_weapon_fetch()},evolution_summon_fetch:function(){var a=this;this.evolution_summon_list=new g,this.evolution_summon_list.rarity="0",this.evolution_summon_list.target="2",this.evolution_summon_list.item_type="2",this.evolution_summon_list.list_flag="1",this.stopListening(this.evolution_summon_list,"reset"),this.listenTo(this.evolution_summon_list,"reset",this.evolution_npc_fetch),this.evolution_summon_fetch=function(){a.evolution_summon_list.fetch({reset:!0})},this.evolution_summon_fetch()},evolution_npc_fetch:function(){var a=this;this.evolution_npc_list=new g,this.evolution_npc_list.rarity="0",this.evolution_npc_list.target="3",this.evolution_npc_list.item_type="2",this.evolution_npc_list.list_flag="1",this.stopListening(this.evolution_npc_list,"reset"),this.listenTo(this.evolution_npc_list,"reset",this.enhancement_weapon_fetch),this.evolution_npc_fetch=function(){a.evolution_npc_list.fetch({reset:!0})},this.evolution_npc_fetch()},enhancement_weapon_fetch:function(){var a=this;this.enhancement_weapon_list=new g,this.enhancement_weapon_list.rarity="0",this.enhancement_weapon_list.target="1",this.enhancement_weapon_list.item_type="1",this.enhancement_weapon_list.list_flag="1",this.stopListening(this.enhancement_weapon_list,"reset"),this.listenTo(this.enhancement_weapon_list,"reset",this.enhancement_summon_fetch),this.enhancement_weapon_fetch=function(){a.enhancement_weapon_list.fetch({reset:!0})},this.enhancement_weapon_fetch()},enhancement_summon_fetch:function(){var a=this;this.enhancement_summon_list=new g,this.enhancement_summon_list.rarity="0",this.enhancement_summon_list.target="2",this.enhancement_summon_list.item_type="1",this.enhancement_summon_list.list_flag="1",this.stopListening(this.enhancement_summon_list,"reset"),this.listenTo(this.enhancement_summon_list,"reset",this.enhancement_npc_fetch),this.enhancement_summon_fetch=function(){a.enhancement_summon_list.fetch({reset:!0})},this.enhancement_summon_fetch()},enhancement_npc_fetch:function(){var a=this;this.enhancement_npc_list=new g,this.enhancement_npc_list.rarity="0",this.enhancement_npc_list.target="3",this.enhancement_npc_list.item_type="1",this.enhancement_npc_list.list_flag="1",this.stopListening(this.enhancement_npc_list,"reset"),this.listenTo(this.enhancement_npc_list,"reset",this.fetchNpcAugumentItem),this.enhancement_npc_fetch=function(){a.enhancement_npc_list.fetch({reset:!0})},this.enhancement_npc_fetch()},fetchNpcAugumentItem:function(){var a=this;this.npcAugumentModel=new g,this.npcAugumentModel.urlMethod="npcaugment_item_list",this.stopListening(this.npcAugumentModel,"reset"),this.listenTo(this.npcAugumentModel,"reset",this.skillplus_item_fetch),this.fetchNpcAugumentItem=function(){a.npcAugumentModel.fetch({reset:!0})},this.fetchNpcAugumentItem()},skillplus_item_fetch:function(){var a=this;this.skillplus_item_list=new g,this.skillplus_item_list.rarity="0",this.skillplus_item_list.target="1",this.skillplus_item_list.item_type="3",this.skillplus_item_list.list_flag="1",this.stopListening(this.skillplus_item_list,"reset"),this.listenTo(this.skillplus_item_list,"reset",this.fetchWeaponSkillplusItem),this.skillplus_item_fetch=function(){a.skillplus_item_list.fetch({reset:!0})},this.skillplus_item_fetch()},fetchWeaponSkillplusItem:function(){var a=this;this.weaponSkillplusModel=new g,this.weaponSkillplusModel.urlMethod="skillplus_item_list",this.stopListening(this.weaponSkillplusModel,"reset"),this.listenTo(this.weaponSkillplusModel,"reset",this.evolution_item_render),this.fetchWeaponSkillplusItem=function(){a.weaponSkillplusModel.fetch({reset:!0})},this.fetchWeaponSkillplusItem()},treasure_item_fetch:function(){var a=this;this.treasure_item_list=new f,this.treasure_item_list.urlMethod="article_list",this.stopListening(this.treasure_item_list,"reset"),this.listenTo(this.treasure_item_list,"reset",this.treasure_render),this.treasure_item_fetch=function(){a.treasure_item_list.fetch({reset:!0})},this.treasure_item_fetch()},gacha_ticket_fetch:function(){var a=this;this.gacha_ticket_list=new f,this.gacha_ticket_list.urlMethod="gacha_ticket_list",this.stopListening(this.gacha_ticket_list,"reset"),this.listenTo(this.gacha_ticket_list,"reset",this.gacha_ticket_render),this.gacha_ticket_fetch=function(){a.gacha_ticket_list.fetch({reset:!0})},this.gacha_ticket_fetch()},fetchOtherItems:function(){var a=this;this.otherItemListCollection=new f,this.otherItemListCollection.urlMethod="others_items",this.stopListening(this.otherItemListCollection,"reset"),this.listenTo(this.otherItemListCollection,"reset",this.renderOtherItems),this.fetchOtherItems=function(){a.otherItemListCollection.fetch({reset:!0})},this.fetchOtherItems()},skypiece_fetch:function(){var a=this;this.skypiece_list=new f,this.skypiece_list.urlMethod="skypiece_list",this.stopListening(this.skypiece_list,"reset"),this.listenTo(this.skypiece_list,"reset",this.skypiece_render),this.skypiece_fetch=function(){a.skypiece_list.fetch({reset:!0})},this.skypiece_fetch()},memorial_fetch:function(){var a=this;this.memorial_item_list=new f,this.memorial_item_list.urlMethod="memorial_item_list",this.stopListening(this.memorial_item_list,"reset"),this.listenTo(this.memorial_item_list,"reset",this.memorial_render),this.memorial_fetch=function(){a.memorial_item_list.fetch({reset:!0})},this.memorial_fetch()},render_pre:function(a){this.content_render(a),this.$el.find(".prt-3tabs").tabs({tabClass:"btn-tabs",tabTarg:"prt-item-list"});var b=$(".btn-tabs").length;if(this.active_tab>=b&&(this.active_tab=0),$(".btn-tabs").removeClass("active").eq(this.active_tab).addClass("active"),$(".prt-item-list").removeClass("active").eq(this.active_tab).addClass("active"),$(".prt-head-current").html(l.getMessage("item_6")),this.isItemListFilter=+$("#filter-flg").val()>=10,this.isItemListFilter&&(this.stopListening(Game.view,"completeTabChange"),this.listenTo(Game.view,"completeTabChange",this.changeTab)),1==this.active_tab)this.skypiece_fetch();else if(2==this.active_tab)this.memorial_fetch();else if(this.isItemListFilter){var c=this;this.itemFilterPosModel=new(h.extend({urlRoot:Game.baseUri+"item/item_menu_position_set"})),this.stopListening(this.itemFilterPosModel),this.listenTo(this.itemFilterPosModel,"sync",function(){c.trigger("xhrEnd")}),this.trigger("xhrStart"),this.fetchTreasureItem()}else this.normal_item_fetch()},render:function(){function a(){var a=_.bind(_.throttle(b.filterFollow,q),b);b.scrollTarget.on("scroll.itemList",a)}if(this.isItemListFilter){var b=this;Game.ua.hasPcgamecontainerIrregularParent()?Game.ua.isGree()&&window.isGreeSidebarReady===!1?window.addEventListener("greeSidebarReady",function(c){window.removeEventListener("greeSidebarReady",arguments.callee),b.scrollTarget=$(Game.gameContainer.selector).parent(),a()}):(this.scrollTarget=$(Game.gameContainer.selector).parent(),a()):(this.scrollTarget=$(document),a()),this.setFilterPos()}else this.fetchOtherItems();return this.trigger("loadEnd"),this},normal_render:function(){this.$el.find("#prt-normal").html(_.template($("#tpl-prt-normal").html(),{title:l.getMessage("item_7"),item:this.normal_item_list.toJSON(),kind:"normal"}));var a={page:0,first:!0,prev:!1,next:!1,last:1};this.$el.find("#prt-pagination-normal").html(_.template($("#tpl-pagination").html(),a)),this.evolution_weapon_fetch()},evolution_item_render:function(){var a=this.convertItemList(this.evolution_weapon_list),b=this.convertItemList(this.evolution_summon_list),c=this.convertItemList(this.evolution_npc_list),d=this.convertItemList(this.npcAugumentModel),e=this.convertItemList(this.skillplus_item_list),f=this.convertItemList(this.enhancement_weapon_list),g=this.convertItemList(this.enhancement_summon_list),h=this.convertItemList(this.enhancement_npc_list),i=this.convertItemList(this.weaponSkillplusModel),j={title:l.getMessage("item_8"),evolution_weapon:a,evolution_summon:b,evolution_npc:c,skillplus_item:e,npcAugumentItem:d,enhancement_weapon:f,enhancement_summon:g,enhancement_npc:h,weaponSkillplusItem:i,kind:"evolution"};$("#prt-evolution-items").html(_.template($("#tpl-evolution-items").html(),j)),this.treasure_item_fetch()},treasure_render:function(){this.$el.find("#prt-treasure").html(_.template($("#tpl-prt-treasure").html(),{title:l.getMessage("item_9"),item:this.treasure_item_list.toJSON(),kind:"article"}));var a={page:0,first:!0,prev:!1,next:!1,last:1};this.$el.find("#prt-pagination-treasurel").html(_.template($("#tpl-pagination").html(),a)),this.gacha_ticket_fetch()},gacha_ticket_render:function(){this.$el.find("#prt-tickets").html(_.template($("#tpl-prt-tickets").html(),{title:l.getMessage("item_10"),item:this.gacha_ticket_list.toJSON(),kind:"ticket"})),this.render()},renderOtherItems:function(a){this.otherItemListData=a.toJSON(),this.$el.find("#prt-others").html(_.template($("#tpl-prt-others").html(),{itemList:this.otherItemListData})),this.trigger("xhrEnd")},skypiece_render:function(){var a=this.skypiece_list.toJSON();this.$el.find("#prt-skypiece").html(_.template($("#tpl-prt-skypiece").html(),{model:a,kind:"skypiece"}));var b={page:0,first:!0,prev:!1,next:!1,last:1};this.$el.find("#prt-pagination-skypiece").html(_.template($("#tpl-pagination").html(),b)),this.render()},memorial_render:function(){var a=this.memorial_item_list.toJSON();this.$el.find("#prt-memorial").html(_.template($("#tpl-prt-memorial").html(),{item:a,kind:"memorial"}));for(var b=0,c=0;c<a.length;c++)1==a[c].set_flg&&b++;$(".prt-set-num").text(b);var d={page:0,first:!0,prev:!1,next:!1,last:1};this.$el.find("#prt-pagination-memorial").html(_.template($("#tpl-pagination").html(),d)),this.render()},popNormal:function(a){var b=$(a.currentTarget),c=b.data("index");this.useItemNum=1,this.popConfirmItemData=this.isItemListFilter?this.filterModeItemModel.toJSON()[0][c]:this.normal_item_list.at(c).toJSON();var e=this.userStatusModel.toJSON().status;this.popConfirmItemData.recoveryValue={1:e.elixir_recover_value,2:e.elixir_half_recover_value,3:e.soul_powder_recover_value,5:e.soul_seed_recover_value,1102:e.elixir_half_recover_value,1105:e.soul_seed_recover_value,2001:e.elixir_half_recover_value,2002:e.soul_powder_recover_value,2003:e.action_point_limit,2004:e.battle_point_limit}[this.popConfirmItemData.item_id],this.popConfirmItemData.recoveryStr="AP",this.popConfirmItemData.limitValue=e.action_point_limit,this.popConfirmItemData.currentValue=e.now_action_point,2==this.popConfirmItemData.recovery&&(this.popConfirmItemData.recoveryStr=l.getMessage("item_28"),this.popConfirmItemData.limitValue=e.battle_point_limit,this.popConfirmItemData.currentValue=e.now_battle_point),this.setUseItemInfo(1);var f=_.extend(this.popConfirmItemData,{kind:"normal"});this.use_item_id=f.item_id;var g={1:10,2:20,3:20,5:99,1102:20,1105:99,2001:20,2002:20,2003:1,2004:1}[this.popConfirmItemData.item_id],h=+this.popConfirmItemData.limitValue-f.currentValue;f.canUseNum=Math.ceil(h/+f.recoveryValue),f.canUseNum>g&&(f.canUseNum=g),f.canUseNum>f.number&&(f.canUseNum=f.number),this.popView=new d({className:"pop-normal",title:l.getMessage("item_11"),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),this.popView.$el.find(".txt-popup-body").html(_.template($("#tpl-pop-body").html(),f)),3!=f.recovery&&1==f.can_use&&0!=f.number&&$(".pop-normal .prt-popup-footer").append("<div class='btn-usual-use'></div>"),this.popView.popShow()},changeUseItemNum:function(a){var b=$(a.currentTarget);this.useItemNum=b.find("option:selected").val(),this.setUseItemInfo(this.useItemNum);var c=$("#pop").find(".pop-normal");c.find(".after-point").html(this.popConfirmItemData.afterValue),c.find(".after-num").html(this.popConfirmItemData.number-this.useItemNum);var d=c.find(".prt-over-limit");this.popConfirmItemData.isOverLimit?!d.hasClass("show")&&d.addClass("show"):d.hasClass("show")&&d.removeClass("show")},setUseItemInfo:function(a){this.popConfirmItemData.isOverLimit=!1,void 0===this.popConfirmItemData.recoveryValue?this.popConfirmItemData.afterValue=l.getMessage("item_12"):(this.popConfirmItemData.afterValue=+this.popConfirmItemData.currentValue+ +this.popConfirmItemData.recoveryValue*a,this.popConfirmItemData.limitValue<this.popConfirmItemData.afterValue&&(this.popConfirmItemData.afterValue=this.popConfirmItemData.limitValue,this.popConfirmItemData.isOverLimit=!0))},party_check:function(){var a=this.$el.find(".cnt-item").data("is-quest-progress");this.tempPopConfirm=null,1==this.use_item_id&&a?(Game.ua.isIOS()&&+Game.ua.os.version.split(".")[0]>=10&&$("#wrapper").find("select:focus").blur(),this.tempPopConfirm=$("#pop").html(),this.popView=new d({className:"pop-actparty",title:l.getMessage("item_13"),body:_.template($("#tpl-pop-actparty").html(),a),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),$(".pop-actparty .prt-popup-footer").append("<div class='btn-usual-use'></div>"),this.popView.popShow()):this.itemUseRequest()},itemUseRequest:function(){this.trigger("xhrStart"),this.item_model=new(h.extend({urlRoot:Game.baseUri+"item/use_normal_item"})),this.listenToOnce(this.item_model,"sync",this.itemUse),this.item_model.set({item_id:this.use_item_id,num:this.useItemNum}),this.item_model.save()},itemUse:function(){if(null!=this.tempPopConfirm&&$("#pop").html(this.tempPopConfirm),$(".cnt-confirm").children("div").slice(2,4).hide(),this.item_model.get("use_flag")){this.isItemListFilter?this.fetchItems():this.normal_item_fetch();var a=this.item_model.toJSON();$(".cnt-confirm .result").html(_.template($("#tpl-result-normal").html(),a)),$(".prt-popup-footer").empty().append("<div class='btn-usual-close'></div>"),k.playRecoverySE()}else $(".cnt-confirm").children("div").slice(2,4).hide(),$(".cnt-confirm .result").html(l.getMessage("item_14")),$(".prt-popup-footer").empty().append("<div class='btn-usual-close'></div>");this.trigger("xhrEnd")},popTreasure:function(a){var b=$(a.currentTarget),c=b.data("index");if(this.isItemListFilter)var e=this.$el.find(".btn-filter.active").length>0?this.filterRenderItem[c]:this.allTreasureItemList[c];else var e=this.treasure_item_list.at(c).toJSON();var f=_.extend(e,{kind:"article"});this.popView=new d({className:"pop-treasure",title:l.getMessage("pop_treasure_title"),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),this.popView.$el.find(".txt-popup-body").html(_.template($("#tpl-pop-body-treasure").html(),f)),this.popView.popShow(),Game.ua.isChromeApp()===!1&&Game.ua.isSPBrowser()===!1&&f.is_display_select_item===!0&&Game.treasure.slideToTargetPage(f.item_id)},popTickets:function(a){var b=$(a.currentTarget),c=b.data("index"),e=this.isItemListFilter?this.filterModeTicketModel.toJSON()[0][c]:this.gacha_ticket_list.at(c).toJSON(),f=_.extend(e,{kind:"article"});this.popView=new d({className:"pop-tickets",title:l.getMessage("item_15"),body:_.template($("#tpl-pop-tickets").html(),f),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),this.popView.popShow()},removeTikets:function(){this.removePop(),this.gacha_ticket_fetch()},popMemorial:function(a){var b=$(a.currentTarget),c=b.data("index"),e=_.extend(this.memorial_item_list.at(c).toJSON(),{kind:"memorial",recovery:0});e.number=1,this.popView=new d({className:"pop-memorial",title:l.getMessage("item_16"),flagBtnClose:1,flagBtnOk:0}),this.popView.render(),this.popView.$el.find(".txt-popup-body").html(_.template($("#tpl-pop-body").html(),e)),this.popView.popShow()},removePop:function(){this.popView.popRemove()},checkSkyPiece:function(){var a=0,b=this.skypiece_list.toJSON();b=b[0].popup,a=1;var c=b.title;c=c.split("　"),c=c[0];var e={piece_id:b.piece_id,piece_name:b.piece_name,episode:b.episode,available_flag:b.available_flag,title:c},f=_.template($("#tpl-pop-skypiece").html(),e);this.popView=new d({className:"pop-skypiece",title:e.piece_name,body:f,flagBtnCancel:1,flagBtnOk:a}),this.popView.render(),this.popView.popShow()},locationQuest:function(){this.content_close(),a.history.navigate("quest",!0)},popEvolutionWeapon:function(a){var b=$(a.currentTarget),c=b.data("id"),e=b.data("rarity"),f=b.data("index"),g=this.isItemListFilter?this.filterModeItemModel.toJSON()[1][0][f]:this.evolution_weapon_list.toJSON()[0].items[f];g.type="evolution",this.popView=new d({className:"pop-evolution-weapon",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-evolution").html(),g),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),g.number>0&&($(".pop-evolution-weapon .prt-popup-footer").append("<div class='btn-usual-use'></div>"),$(".pop-evolution-weapon .btn-usual-use").attr({"data-rarity":e,"data-id":c})),this.popView.popShow()},evolutionWeapon:function(b){var c=$(b.currentTarget),d=c.data("id"),e=c.data("rarity");this.content_close(),a.history.navigate("evolution/weapon/base/"+d+"/"+e,!0)},popEvolutionSummon:function(a){var b=$(a.currentTarget),c=b.data("id"),e=b.data("rarity"),f=b.data("index"),g=this.isItemListFilter?this.filterModeItemModel.toJSON()[1][1][f]:this.evolution_summon_list.toJSON()[0].items[f];g.type="evolution",this.popView=new d({className:"pop-evolution-summon",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-evolution").html(),g),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),g.number>0&&($(".pop-evolution-summon .prt-popup-footer").append("<div class='btn-usual-use'></div>"),$(".pop-evolution-summon .btn-usual-use").attr({"data-rarity":e,"data-id":c})),this.popView.popShow()},popAddSkillWeapon:function(a){var b=$(a.currentTarget),c=b.data("id"),e=+b.data("index"),f=this.isItemListFilter?this.filterModeItemModel.toJSON()[1][3][e]:this.skillplus_item_list.toJSON()[0].items[e];this.popView=new d({className:"pop-addskill-weapon",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-addskill").html(),f),flagBtnCancel:1,flagBtnOk:1}),this.popView.render(),this.$el.find(".pop-addskill-weapon .btn-usual-ok").attr({"data-item-id":c,"data-type":0}),this.popView.popShow()},evolutionSummon:function(b){var c=$(b.currentTarget),d=c.data("id"),e=c.data("rarity");this.content_close(),a.history.navigate("evolution/summon/base/"+d+"/"+e,!0)},popWeaponSkillpuls:function(a){var b=$(a.currentTarget),c=b.data("id"),e=+b.data("index"),f=b.data("skillplus-type"),g=this.isItemListFilter?this.filterModeItemModel.toJSON()[2][e]:this.weaponSkillplusModel.toJSON()[0].items[e];this.popView=new d({className:"pop-addskill-weapon",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-addskill").html(),g),flagBtnCancel:1,flagBtnOk:1}),this.popView.render(),this.$el.find(".pop-addskill-weapon .btn-usual-ok").attr({"data-item-id":c,"data-type":f}),this.popView.popShow()},popNpcAugument:function(a){var b=this,c=$(a.currentTarget),e=c.data("id"),f=+c.data("index"),g=c.data("type"),h=this.isItemListFilter?this.filterModeItemModel.toJSON()[3][f]:this.npcAugumentModel.toJSON()[0].items[f];this.popView=new d({className:"pop-npc-augument",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-npc-augument").html(),h),flagBtnCancel:1,flagBtnOk:1,showStartCallback:function(){b.popView.$el.find(".btn-usual-ok").attr({"data-item-id":e,"data-type":g}).addClass("is-augument")}}),this.popView.render().popShow()},popEvolutionNpc:function(a){var b=$(a.currentTarget),c=b.data("id"),e=b.data("rarity"),f=b.data("index"),g=this.isItemListFilter?this.filterModeItemModel.toJSON()[1][2][f]:this.evolution_npc_list.toJSON()[0].items[f];g.type="evolution",this.popView=new d({className:"pop-evolution-npc",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-evolution").html(),g),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),g.number>0&&($(".pop-evolution-npc .prt-popup-footer").append("<div class='btn-usual-use'></div>"),$(".pop-evolution-npc .btn-usual-use").attr({"data-rarity":e,"data-id":c})),this.popView.popShow()},evolutionNpc:function(b){var c=$(b.currentTarget),d=c.data("id"),e=c.data("rarity");this.content_close(),a.history.navigate("evolution/npc/base/"+d+"/"+e,!0)},popEnhancementItem:function(a){var b=$(a.currentTarget),c=b.data("id"),e=b.data("index"),f=b.data("type"),g=b.data("kind");if(this.isItemListFilter){var h=this.filterModeItemModel.toJSON()[1][4];"summon"==f?h=this.filterModeItemModel.toJSON()[1][5]:"npc"==f&&(h=this.filterModeItemModel.toJSON()[1][6]);var i=h[e]}else{var h=this.enhancement_weapon_list.toJSON();"summon"==f?h=this.enhancement_summon_list.toJSON():"npc"==f&&(h=this.enhancement_npc_list.toJSON());var i=h[0].items[e]}if(i.type="enhancement",this.popView=new d({className:"pop-use-enhancement",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-evolution").html(),i),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),i.number>0){var j='<div class="btn-usual-use" data-item-id="'+c+'" data-type="'+f+'" data-kind="'+g+'"></div>';this.popView.$el.find(".prt-popup-footer").append(j)}this.popView.popShow()},popOtherItem:function(a){var b=$(a.currentTarget),c=b.data("index"),e=this.isItemListFilter?this.filterModeTicketModel.toJSON()[1][c]:this.otherItemListData[c];e.popType="confirm";var f=[0,1,0],g=l.getMessage("item_26");e.can_use&&(f=[1,0,1],g=l.getMessage("item_11"),1>+e.number&&(f=[1,0,0])),this.popView=new d({className:"pop-other-item",title:g,body:_.template($("#tpl-pop-other-item").html(),e),flagBtnCancel:f[0],flagBtnClose:f[1],flagBtnOk:f[2]}),this.popView.render(),e.can_use&&this.popView.$el.find(".btn-usual-ok").attr({"data-item-id":e.item_id,"data-item-kind":e.item_kind,"data-usu-num":1}).data({"item-id":e.item_id,"item-kind":e.item_kind,"use-num":1}),this.popView.popShow()},postUseOtherItem:function(a){this.trigger("xhrStart");var b=$(a.currentTarget),c=new(h.extend({urlRoot:Game.baseUri+"item/use_lottery_item"}));this.stopListening(c),this.listenToOnce(c,"sync",this.showUseOtherResult),c.set({item_kind:b.data("item-kind"),item_id:b.data("item-id"),num:b.data("num")}),c.save()},showUseOtherResult:function(a){this.popView&&this.removePop();var b=a.toJSON(),c={win_items:b.win_items,comment:b.lottery_item_comment,item_id:b.lottery_item_id,item_kind:b.lottery_item_kind,name:b.lottery_item_name,number:null,folder:b.lottery_item_folder,popType:"result"};this.popView=new d({className:"pop-other-item-result",title:l.getMessage("item_27"),body:_.template($("#tpl-pop-other-item").html(),c),flagBtnClose:1,showEndCallback:function(){k.playSE("se/poker_se_7.mp3")}}),this.popView.render().popShow(),this.trigger("xhrEnd")},popRemoveListRefresh:function(){this.trigger("xhrStart"),this.popView&&this.removePop(),this.isItemListFilter?this.fetchTicket():this.normal_item_fetch()},locationEnhancement:function(b){var c=$(b.currentTarget),d=c.data("item-id"),e=c.data("type"),f=c.data("kind"),g="enhancement/"+e+"/base/use_item/"+d;"weapon"===e||"summon"===e?g+="/"+f:c.hasClass("is-augument")===!0&&(g+="/1"),this.content_close(),a.history.navigate(g,!0)},slideButton:function(a){var b=$(a.currentTarget);b.addClass("slide-btn")},popRecycleItem:function(a){var b=this,c=$(a.currentTarget),e=c.data("index"),f=c.data("id"),g=c.data("kind"),h=c.data("type"),i="summon"===h,j=i===!0?2:1,k=null;if(this.isItemListFilter===!0){var m=i===!0?1:0;k=this.filterModeItemModel.toJSON()[4][m][e]}else{var n=i===!0?this.enhancement_summon_list:this.enhancement_weapon_list;k=this.convertItemList(n)[e]}if(k.type="recycle",k.activeTab=j,this.popView=new d({className:"pop-recycle-item",title:l.getMessage("item_11"),body:_.template($("#tpl-pop-evolution").html(),k),flagBtnCancel:1,flagBtnOk:0}),this.popView.render(),+k.number>0){var o="enhancement/"+h+"/base/use_item/"+f+"/"+g,p='<div class="btn-usual-use" data-href="'+o+'"></div>';b.popView.$el.find(".prt-popup-footer").append(p)}this.popView.popShow()},getSkyPiece:function(a){var b=$(a.currentTarget),c=b.data("piece-index"),e=+b.data("piece-id").replace(/item_map_([0-9]+)_[0-9]+/gi,"$1"),f=this.skypiece_list.toJSON(),g=f[e-1].item[c],h=_.template($("#tpl-pop-get-skypiece").html(),g);this.popView=new d({className:"pop-get-skypiece",title:g.name,body:h,flagBtnCancel:1,flagBtnOk:1}),this.popView.render(),this.popView.popShow()},setMemorialSetting:function(a){var b=$(a.currentTarget),c=+b.data("id"),d=1===+b.attr("set-flg")?0:1;b.attr({"set-flg":d});var e=new(h.extend({urlRoot:Game.baseUri+"item/set_memorial_item"}));this.listenToOnce(e,"sync",this.memorial_fetch),e.save({item_id:c,set_flg:d})},locationAddSkillWeaponList:function(b){this.content_close();var c=$(b.currentTarget);a.history.navigate("enhancement/weapon/skillplus/"+c.data("item-id")+"/"+c.data("type"),!0)},convertItemList:function(a){if(this.isItemListFilter)var b=a.length>0?a:null;else var b=a.models.length>0?a.toJSON():null;if(null!==b){this.isItemListFilter||(b=b[0].items);var c=_.some(b,function(a){return 0<Number(a.number)||+a.item_kind_id===n});c||(b=null)}return b},itemListTabs:function(a){var b=this.$el.find(a.currentTarget);if(!b.hasClass("active"))switch(b.parent().find("div").removeClass("active"),b.addClass("active"),this.trigger("xhrStart"),b.data("type")){case"treasure":this.fetchTreasureItem();break;case"items":this.fetchItems();break;case"ticket":this.fetchTicket()}},fetchTreasureItem:function(){var a=this;this.filterModeTreasureModel=new(i.extend({urlRoot:Game.baseUri+"item/article_list_by_filter_mode"})),this.stopListening(this.filterModeTreasureModel,"sync"),this.listenToOnce(this.filterModeTreasureModel,"sync",function(b){this.allTreasureItemList=b.toJSON(),a.renderListTreasure()}),this.fetchTreasureItem=function(){a.renderListTreasure()},this.filterModeTreasureModel.fetch()},renderListTreasure:function(){var a={item:this.$el.find(".btn-filter.active").length>0?this.filterRenderItem:this.allTreasureItemList};$("#prt-target-list").html(_.template($("#tpl-prt-treasure-list").html(),a)),this.$el.find(".prt-module-item-list").addClass("type-filter"),this.$el.find(".prt-filter-wrap").removeClass("filter-hide"),this.setFilterPos(),this.trigger("xhrEnd"),this.firstFlg&&(this.firstFlg=!1,this.render())},fetchItems:function(){var a=this;this.filterModeItemModel=new(i.extend({urlRoot:Game.baseUri+"item/recovery_and_evolution_list_by_filter_mode"})),this.stopListening(this.filterModeItemModel,"sync"),this.listenTo(this.filterModeItemModel,"sync",this.getUserStatusFilterMode),this.fetchItems=function(){a.filterModeItemModel.fetch()},this.fetchItems()},getUserStatusFilterMode:function(){var a=this;this.userStatusModel=new j,this.stopListening(this.userStatusModel,"sync"),this.listenToOnce(this.userStatusModel,"sync",this.renderListItem),this.getUserStatusFilterMode=function(){a.userStatusModel.fetch()},this.getUserStatusFilterMode()},renderListItem:function(){var a=this.filterModeItemModel.toJSON(),b=a[0],c=this.convertItemList(a[1][0]),d=this.convertItemList(a[1][1]),e=this.convertItemList(a[1][2]),f=this.convertItemList(a[1][3]),g=this.convertItemList(a[1][4]),h=this.convertItemList(a[1][5]),i=this.convertItemList(a[1][6]),j=this.convertItemList(a[2]),k=this.convertItemList(a[3]),l=a[4][0],m=a[4][1],n=_.some(l,function(a){return+a.number>0}),o=_.some(m,function(a){return+a.number>0}),p={normalItem:b,evolutionWeapon:c,evolutionSummon:d,evolutionNpc:e,skillplusItem:f,enhancementWeapon:g,enhancementSummon:h,enhancementNpc:i,weaponSkillplusItem:j,npcAugumentItem:k,recycleWeapon:l,recycleSummon:m,hasRecycleWeaponFlag:n,hasRecycleSummonFlag:o};$("#prt-target-list").html(_.template($("#tpl-prt-item-lsit").html(),p)),this.$el.find(".prt-module-item-list").removeClass("type-filter"),this.$el.find(".prt-filter-wrap").addClass("filter-hide"),this.trigger("xhrEnd")},fetchTicket:function(){var a=this;this.filterModeTicketModel=new(i.extend({urlRoot:Game.baseUri+"item/gacha_ticket_and_others_list_by_filter_mode"})),this.stopListening(this.filterModeTicketModel,"sync"),this.listenTo(this.filterModeTicketModel,"sync",this.renderListTicket),this.fetchTicket=function(){a.filterModeTicketModel.fetch()},this.fetchTicket()},renderListTicket:function(){var a=this.filterModeTicketModel.toJSON(),b=_.every(a[0],function(a){return 0===Number(a.number)}),c={ticketItem:a[0],
otherItem:a[1],isTicketItemNone:b};$("#prt-target-list").html(_.template($("#tpl-prt-tickets-list").html(),c)),this.$el.find(".prt-module-item-list").removeClass("type-filter"),this.$el.find(".prt-filter-wrap").addClass("filter-hide"),this.trigger("xhrEnd")},filterFollow:function(){function a(){c.scrollTarget.off("scroll.itemList")}var b=this.$el.find(".prt-item-filter");if(0===b.length){var c=this;return void(""===this.scrollTarget?Game.ua.hasPcgamecontainerIrregularParent()?Game.ua.isGree()&&window.isGreeSidebarReady===!1?window.addEventListener("greeSidebarReady",function(b){window.removeEventListener("greeSidebarReady",arguments.callee),c.scrollTarget=$(Game.gameContainer.selector).parent(),a()}):(this.scrollTarget=$(Game.gameContainer.selector).parent(),a()):(this.scrollTarget=$(document),a()):a())}if("normal_item_tab"!=$(".btn-tabs.active").attr("id"))return void b.removeClass("pos-fixed pos-end");var d=this.scrollTarget.scrollTop(),e=d>this.scrollTopLimit,f=d>=this.scrollBottomLimit;this.$itemFilterList.toggleClass("pos-fixed",e&&!f).toggleClass("pos-end",e&&f)},changeTab:function(){$("#normal_item_tab").hasClass("active")&&this.setFilterPos()},setFilterPos:function(){this.scrollTopLimit=(this.$el.find(".prt-item-filter")[0].offsetTop-o)*window.deviceRatio,_.isUndefined(this.$itemFilterList)===!0&&(this.$itemFilterList=this.$el.find(".prt-item-filter-list"));var a=p+this.$itemFilterList.height();this.scrollBottomLimit=(this.$el.find(".prt-lead-link")[0].offsetTop-a)*window.deviceRatio},selectItemTab:function(){this.isItemListFilter||this.normal_item_fetch()},changePosition:function(){var a=this.$el.find(".prt-item-filter"),b=a.hasClass("left-pos")?11:10;this.itemFilterPosModel.set({filter_mode:b}),this.itemFilterPosModel.save(),this.trigger("xhrStart"),11===b?a.removeClass("left-pos").addClass("right-pos"):a.removeClass("right-pos").addClass("left-pos")},popAllocation:function(a){switch($(a.currentTarget).data("itemType")){case"treasure":this.popTreasure(a);break;case"normal":this.popNormal(a);break;case"ticket":this.popTickets(a);break;case"otherItem":this.popOtherItem(a)}},filterTreasure:function(a){var b=$(a.currentTarget);b.hasClass("active")?b.removeClass("active"):b.addClass("active"),this.trigger("xhrStart");var c=[];_.each(b.parent().find(".btn-filter"),function(a,b){c[b]=$(a).hasClass("active")?!0:!1}),this.filterRenderItem=_.filter(this.allTreasureItemList,function(a){if(null!==a){var b=_.filter(a.category_type,function(a){return c[+a]});return b.length>0}}),this.scrollTarget.scrollTop(0),this.renderListTreasure()},locationArchive:function(){this.content_close(),a.history.navigate("archive/top",!0)},location_memorial_help:function(){this.content_close(),a.history.navigate("help_detail/5/3/106",!0)},registrateTreasure:function(a){function b(){c.trigger("xhrStart");var a=new(h.extend({urlRoot:Game.baseUri+"item/"+g}));c.stopListening(a),c.listenToOnce(a,"sync",function(a){if(c.trigger("xhrEnd"),d.toggleClass("selected",!e),c.isItemListFilter){var b=_.findWhere(c.allTreasureItemList,{item_id:f.toString()});b.is_display_select_item=!e}else for(var g=c.treasure_item_list.models,h=0,i=g.length;i>h;h+=1)if(g[h].get("item_id")===f.toString()){g[h].set("is_display_select_item",!e);break}}),a.set({item_id:f,item_kind_id:m}),a.save()}var c=this,d=$(a.currentTarget),e=d.hasClass("selected"),f=+this.popView.$el.find(".cnt-confirm").attr("item_id"),g=e?"remove_display_select_item":"add_display_select_item";if(e===!1)Game.treasure.isAddingNow=!0,b();else{var i=$("#treasure-list").find('.prt-treasure-wrapper[data-item-id="'+f+'"]').parent();i.addClass("fadeout").oneAnimationEnd(function(){$(this).remove(),b()},550)}}});return r});