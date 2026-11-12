(function () {
  "use strict";

  var DECK_SIZE = 24;
  var COPY_LIMIT = 3;
  var MAX_MANA = 10;
  var MASTER_HP = 25;
  var START_HAND = 4;
  var STORAGE_KEY = "scm-deck-v1";

  var EL = {
    light: { label: "빛", beats: "dark" },
    dark: { label: "암", beats: "water" },
    water: { label: "물", beats: "fire" },
    fire: { label: "불", beats: "forest" },
    forest: { label: "숲", beats: "light" }
  };

  var PALETTE = {
    light: ["#f8e7b0", "#d4a017"],
    dark: ["#c4b5fd", "#6d28d9"],
    water: ["#7dd3fc", "#0369a1"],
    fire: ["#fdba74", "#c2410c"],
    forest: ["#86efac", "#15803d"],
    master: ["#fde68a", "#b45309"]
  };

  var CARDS = [
    { id: "lumen-squire", name: "루멘 견습생", type: "creature", element: "light", cost: 1, atk: 1, hp: 2, art: "knight", text: "전선의 첫 방패." },
    { id: "dawn-lancer", name: "새벽의 창병", type: "creature", element: "light", cost: 2, atk: 2, hp: 2, art: "knight", text: "앞열을 밀어붙인다." },
    { id: "sanctum-guard", name: "성역의 수호자", type: "creature", element: "light", cost: 3, atk: 2, hp: 5, art: "knight", text: "두꺼운 방패. 앞열 수비." },
    { id: "solar-paladin", name: "태양 성기사", type: "creature", element: "light", cost: 5, atk: 4, hp: 5, art: "knight", text: "빛 속성의 주력." },
    { id: "shade-cutter", name: "그림자 칼잡이", type: "creature", element: "dark", cost: 1, atk: 2, hp: 1, art: "rogue", text: "빠르고 약하다." },
    { id: "night-witch", name: "밤의 마녀", type: "creature", element: "dark", cost: 3, atk: 2, hp: 3, art: "mage", text: "소환 시 1장 뽑기.", summon: { type: "draw", value: 1 } },
    { id: "abyss-knight", name: "심연 기사", type: "creature", element: "dark", cost: 4, atk: 4, hp: 3, art: "knight", text: "높은 공격력." },
    { id: "abyss-lord", name: "심연의 군주", type: "creature", element: "dark", cost: 7, atk: 6, hp: 6, art: "dragon", text: "전장을 짓누르는 피니시." },
    { id: "tide-spirit", name: "파도 정령", type: "creature", element: "water", cost: 2, atk: 1, hp: 3, art: "spirit", text: "잔잔한 수비." },
    { id: "deep-archer", name: "심해 사수", type: "creature", element: "water", cost: 3, atk: 3, hp: 2, art: "rogue", text: "중코스트 어그로." },
    { id: "sea-warden", name: "해신 수호자", type: "creature", element: "water", cost: 4, atk: 2, hp: 6, art: "knight", text: "앞열을 오래 지킨다." },
    { id: "ember-imp", name: "불꽃 임프", type: "creature", element: "fire", cost: 1, atk: 2, hp: 1, art: "spirit", text: "값싼 화력." },
    { id: "magma-warrior", name: "용암 전사", type: "creature", element: "fire", cost: 3, atk: 3, hp: 3, art: "knight", text: "균형 잡힌 화염." },
    { id: "flame-drake", name: "화염 드레이크", type: "creature", element: "fire", cost: 5, atk: 5, hp: 4, art: "dragon", text: "화염의 중대형." },
    { id: "grove-sprite", name: "숲의 요정", type: "creature", element: "forest", cost: 1, atk: 1, hp: 2, art: "spirit", text: "소환 시 마스터 회복 1.", summon: { type: "healMaster", value: 1 } },
    { id: "thorn-ward", name: "가시 수호병", type: "creature", element: "forest", cost: 2, atk: 1, hp: 4, art: "knight", text: "가시 방벽." },
    { id: "ancient-treant", name: "고대 나무정령", type: "creature", element: "forest", cost: 6, atk: 4, hp: 8, art: "beast", text: "전선을 고정한다." },
    { id: "holy-strike", name: "성스러운 일격", type: "spell", element: "light", cost: 2, art: "spell", text: "대상에게 피해 3.", spell: { type: "damage", value: 3, target: "any" } },
    { id: "shadow-burst", name: "암흑 폭발", type: "spell", element: "dark", cost: 3, art: "spell", text: "적 생물 전체 피해 2.", spell: { type: "aoe", value: 2 } },
    { id: "healing-spring", name: "치유의 샘", type: "spell", element: "water", cost: 2, art: "spell", text: "내 마스터 회복 4.", spell: { type: "healMaster", value: 4 } },
    { id: "fireball", name: "화염구", type: "spell", element: "fire", cost: 2, art: "spell", text: "대상에게 피해 4.", spell: { type: "damage", value: 4, target: "any" } },
    { id: "natures-ward", name: "자연의 가호", type: "spell", element: "forest", cost: 1, art: "spell", text: "아군 생물 +1/+1.", spell: { type: "buff", atk: 1, hp: 1, target: "allyCreature" } },
    { id: "soul-drain", name: "영혼 흡수", type: "spell", element: "dark", cost: 4, art: "spell", text: "적 생물 2 피해, 마스터 2 회복.", spell: { type: "drain", value: 2, target: "enemyCreature" } },
    { id: "mana-crystal", name: "마나 결정", type: "spell", element: "water", cost: 1, art: "spell", text: "카드 2장 뽑기.", spell: { type: "draw", value: 2 } }
  ];

  var CARD_MAP = {};
  CARDS.forEach(function (c) { CARD_MAP[c.id] = c; });

  var DEFAULT_DECK = [
    "lumen-squire", "lumen-squire", "dawn-lancer", "dawn-lancer", "sanctum-guard",
    "solar-paladin", "shade-cutter", "shade-cutter", "night-witch", "abyss-knight",
    "tide-spirit", "deep-archer", "sea-warden", "ember-imp", "ember-imp",
    "magma-warrior", "flame-drake", "grove-sprite", "thorn-ward", "ancient-treant",
    "holy-strike", "fireball", "healing-spring", "mana-crystal"
  ];

  var ENEMY_DECK = [
    "ember-imp", "ember-imp", "ember-imp", "shade-cutter", "shade-cutter",
    "dawn-lancer", "magma-warrior", "magma-warrior", "deep-archer", "night-witch",
    "abyss-knight", "flame-drake", "sanctum-guard", "sea-warden", "thorn-ward",
    "solar-paladin", "abyss-lord", "holy-strike", "fireball", "fireball",
    "shadow-burst", "soul-drain", "natures-ward", "mana-crystal"
  ];

  var app = document.getElementById("scm-app");
  if (!app) return;
  document.body.classList.add("scm-page");

  var els = {
    screens: app.querySelectorAll(".scm-screen"),
    collection: document.getElementById("scm-collection"),
    myDeck: document.getElementById("scm-my-deck"),
    deckN: document.getElementById("scm-deck-n"),
    boardEnemy: document.getElementById("scm-board-enemy"),
    boardPlayer: document.getElementById("scm-board-player"),
    hudEnemy: document.getElementById("scm-hud-enemy"),
    hudPlayer: document.getElementById("scm-hud-player"),
    turnBanner: document.getElementById("scm-turn-banner"),
    hand: document.getElementById("scm-hand"),
    hint: document.getElementById("scm-hint"),
    log: document.getElementById("scm-log"),
    fx: document.getElementById("scm-fx"),
    modal: document.getElementById("scm-modal"),
    modalTitle: document.getElementById("scm-modal-title"),
    modalBody: document.getElementById("scm-modal-body"),
    endTurn: document.getElementById("scm-end-turn")
  };

  var deckIds = loadDeck();
  var battle = null;
  var aiTimer = null;

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i];
      a[i] = a[j];
      a[j] = t;
    }
    return a;
  }

  function loadDeck() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return DEFAULT_DECK.slice();
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return DEFAULT_DECK.slice();
      var valid = parsed.filter(function (id) { return CARD_MAP[id]; });
      return valid.length ? valid : DEFAULT_DECK.slice();
    } catch (e) {
      return DEFAULT_DECK.slice();
    }
  }

  function saveDeck() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(deckIds));
  }

  function countsOf(list) {
    var map = {};
    list.forEach(function (id) {
      map[id] = (map[id] || 0) + 1;
    });
    return map;
  }

  function artSvg(kind, element) {
    var pal = PALETTE[element] || PALETTE.light;
    var a = pal[0];
    var b = pal[1];
    var body = {
      knight:
        '<circle cx="16" cy="9" r="4.2" fill="' + a + '"/>' +
        '<path d="M11 15 L16 13.5 L21 15 L22 27 L10 27Z" fill="' + b + '"/>' +
        '<path d="M8 11 L16 6 L24 11" fill="none" stroke="' + a + '" stroke-width="2"/>' +
        '<rect x="22" y="14" width="2.2" height="12" fill="' + a + '"/>',
      rogue:
        '<circle cx="16" cy="9" r="3.6" fill="' + a + '"/>' +
        '<path d="M12 14 L16 13 L20 14 L19 26 L13 26Z" fill="' + b + '"/>' +
        '<path d="M7 18 L14 16 L7 14" fill="' + a + '"/>' +
        '<path d="M25 18 L18 16 L25 14" fill="' + a + '"/>',
      mage:
        '<circle cx="16" cy="9" r="3.8" fill="' + a + '"/>' +
        '<path d="M11 14 L16 13 L21 14 L23 27 L9 27Z" fill="' + b + '"/>' +
        '<path d="M16 14 L16 26" stroke="' + a + '" stroke-width="1.6"/>' +
        '<circle cx="16" cy="12" r="1.6" fill="#fff"/>',
      spirit:
        '<ellipse cx="16" cy="16" rx="7" ry="10" fill="' + b + '"/>' +
        '<circle cx="16" cy="12" r="4" fill="' + a + '"/>' +
        '<circle cx="14.2" cy="11.5" r="0.8" fill="#1a1f28"/>' +
        '<circle cx="17.8" cy="11.5" r="0.8" fill="#1a1f28"/>',
      dragon:
        '<path d="M6 20 L16 6 L26 20 L22 26 L10 26Z" fill="' + b + '"/>' +
        '<circle cx="16" cy="14" r="3" fill="' + a + '"/>' +
        '<path d="M8 12 L4 8 M24 12 L28 8" stroke="' + a + '" stroke-width="2"/>',
      beast:
        '<ellipse cx="16" cy="20" rx="9" ry="7" fill="' + b + '"/>' +
        '<circle cx="16" cy="12" r="5" fill="' + a + '"/>' +
        '<rect x="11" y="5" width="3" height="5" fill="' + b + '"/>' +
        '<rect x="18" y="5" width="3" height="5" fill="' + b + '"/>',
      spell:
        '<polygon points="16,4 19,13 28,13 21,18 24,27 16,21 8,27 11,18 4,13 13,13" fill="' + a + '"/>' +
        '<circle cx="16" cy="16" r="3.2" fill="' + b + '"/>',
      master:
        '<circle cx="16" cy="10" r="5" fill="' + a + '"/>' +
        '<path d="M8 16 L16 14 L24 16 L23 28 L9 28Z" fill="' + b + '"/>' +
        '<path d="M10 8 L16 3 L22 8" fill="' + a + '"/>'
    };
    return '<svg viewBox="0 0 32 32" aria-hidden="true">' + (body[kind] || body.knight) + "</svg>";
  }

  function cardMeta(def) {
    if (def.type === "creature") return EL[def.element].label + " · " + def.atk + "/" + def.hp;
    return EL[def.element].label + " · 마법";
  }

  function renderCard(def, opts) {
    opts = opts || {};
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "scm-card scm-el-" + def.element;
    if (opts.selected) btn.classList.add("is-selected");
    if (opts.disabled) btn.classList.add("is-disabled");
    btn.innerHTML =
      '<span class="scm-card-cost">' + def.cost + "</span>" +
      '<div class="scm-card-art">' + artSvg(def.art, def.element) + "</div>" +
      '<div class="scm-card-body">' +
        '<div class="scm-card-name">' + def.name + (opts.count ? " ×" + opts.count : "") + "</div>" +
        '<div class="scm-card-meta">' +
          "<span>" + cardMeta(def) + "</span>" +
        "</div>" +
      "</div>";
    if (opts.onClick && !opts.disabled) btn.addEventListener("click", opts.onClick);
    return btn;
  }

  function showScreen(id) {
    app.setAttribute("data-screen", id);
    els.screens.forEach(function (s) {
      s.hidden = s.getAttribute("data-screen-id") !== id;
    });
    if (id === "deck") renderDeckEditor();
    if (els.modal) els.modal.hidden = true;
  }

  function renderDeckEditor() {
    var counts = countsOf(deckIds);
    els.deckN.textContent = String(deckIds.length);
    els.collection.innerHTML = "";
    els.myDeck.innerHTML = "";

    CARDS.forEach(function (def) {
      var n = counts[def.id] || 0;
      var full = deckIds.length >= DECK_SIZE || n >= COPY_LIMIT;
      els.collection.appendChild(renderCard(def, {
        count: n,
        disabled: full,
        onClick: function () { addToDeck(def.id); }
      }));
    });

    deckIds.forEach(function (id, index) {
      var def = CARD_MAP[id];
      els.myDeck.appendChild(renderCard(def, {
        onClick: function () { removeFromDeck(index); }
      }));
    });
  }

  function addToDeck(id) {
    var n = countsOf(deckIds)[id] || 0;
    if (deckIds.length >= DECK_SIZE || n >= COPY_LIMIT) return;
    deckIds.push(id);
    saveDeck();
    renderDeckEditor();
  }

  function removeFromDeck(index) {
    deckIds.splice(index, 1);
    saveDeck();
    renderDeckEditor();
  }

  function emptyBoard() {
    return [null, null, null, null, null, null];
  }

  function makeMaster(side) {
    return {
      kind: "master",
      side: side,
      name: side === "player" ? "플레이어 마스터" : "그림자 마스터",
      element: side === "player" ? "light" : "dark",
      art: "master",
      hp: MASTER_HP,
      maxHp: MASTER_HP,
      atk: 0,
      exhausted: true
    };
  }

  function makeCreature(def, side) {
    return {
      kind: "creature",
      side: side,
      cardId: def.id,
      name: def.name,
      element: def.element,
      art: def.art,
      atk: def.atk,
      hp: def.hp,
      maxHp: def.hp,
      exhausted: true
    };
  }

  function makePile(ids) {
    return shuffle(ids.map(function (id) { return CARD_MAP[id]; }));
  }

  function playerReady() {
    if (deckIds.length !== DECK_SIZE) {
      hint("덱이 24장이어야 듀얼을 시작할 수 있습니다. 지금은 " + deckIds.length + "장입니다.");
      showScreen("deck");
      return false;
    }
    return true;
  }

  function startDuel() {
    if (!playerReady()) return;
    battle = {
      turn: "player",
      playerTurns: 1,
      enemyTurns: 0,
      over: false,
      selectedHand: -1,
      selectedUnit: null,
      awaiting: null,
      player: {
        mana: 1,
        maxMana: 1,
        deck: makePile(deckIds),
        hand: [],
        board: emptyBoard()
      },
      enemy: {
        mana: 1,
        maxMana: 1,
        deck: makePile(ENEMY_DECK),
        hand: [],
        board: emptyBoard()
      },
      log: []
    };
    battle.player.board[4] = makeMaster("player");
    battle.enemy.board[1] = makeMaster("enemy");
    for (var i = 0; i < START_HAND; i++) {
      drawCard("player", true);
      drawCard("enemy", true);
    }
    log("듀얼 시작. 당신이 선공입니다.");
    showScreen("battle");
    renderBattle();
    hint("카드를 고른 뒤 빈 칸에 소환하거나, 준비된 생물을 눌러 공격하세요.");
  }

  function drawCard(side, silent) {
    var p = battle[side];
    if (!p.deck.length) {
      if (!silent) log((side === "player" ? "당신" : "상대") + "의 덱이 비었습니다.");
      return null;
    }
    var card = p.deck.pop();
    if (p.hand.length >= 8) {
      if (!silent) log(card.name + "이(가) 패 한도로 소멸했습니다.");
      return null;
    }
    p.hand.push(card);
    if (!silent) log((side === "player" ? "당신" : "상대") + "이(가) 카드를 뽑았습니다.");
    return card;
  }

  function masterOf(side) {
    var board = battle[side].board;
    for (var i = 0; i < 6; i++) {
      if (board[i] && board[i].kind === "master") return board[i];
    }
    return null;
  }

  function isFront(side, idx) {
    return side === "enemy" ? idx >= 3 : idx < 3;
  }

  function frontIndex(side, col) {
    return side === "enemy" ? 3 + col : col;
  }

  function canAttackTarget(targetSide, targetIdx) {
    if (isFront(targetSide, targetIdx)) return true;
    var col = targetIdx % 3;
    var blocker = battle[targetSide].board[frontIndex(targetSide, col)];
    return !blocker;
  }

  function elementBonus(atkEl, defEl) {
    if (!atkEl || !defEl || !EL[atkEl]) return 0;
    return EL[atkEl].beats === defEl ? 1 : 0;
  }

  function log(msg) {
    if (!battle) return;
    battle.log.unshift(msg);
    battle.log = battle.log.slice(0, 40);
  }

  function hint(msg) {
    if (els.hint) els.hint.textContent = msg;
  }

  function fxAt(el, html, extraClass) {
    if (!el || !els.fx) return;
    var appBox = app.getBoundingClientRect();
    var box = el.getBoundingClientRect();
    var node = document.createElement("div");
    node.className = extraClass || "";
    node.innerHTML = html;
    node.style.left = (box.left - appBox.left + box.width / 2 - 8) + "px";
    node.style.top = (box.top - appBox.top + box.height / 2 - 8) + "px";
    els.fx.appendChild(node);
    setTimeout(function () {
      if (node.parentNode) node.parentNode.removeChild(node);
    }, 700);
  }

  function burst(el, dmg) {
    if (!el) return;
    el.classList.remove("scm-shake");
    void el.offsetWidth;
    el.classList.add("scm-shake");
    fxAt(el, "", "scm-slash");
    fxAt(el, "", "scm-burst");
    if (dmg) fxAt(el, "-" + dmg, "scm-float");
    for (var i = 0; i < 6; i++) {
      var sp = document.createElement("div");
      sp.className = "scm-spark";
      var appBox = app.getBoundingClientRect();
      var box = el.getBoundingClientRect();
      sp.style.left = (box.left - appBox.left + box.width / 2) + "px";
      sp.style.top = (box.top - appBox.top + box.height / 2) + "px";
      sp.style.setProperty("--dx", (Math.random() * 48 - 24) + "px");
      sp.style.setProperty("--dy", (Math.random() * 36 - 28) + "px");
      els.fx.appendChild(sp);
      setTimeout(function (n) {
        return function () { if (n.parentNode) n.parentNode.removeChild(n); };
      }(sp), 650);
    }
  }

  function slotEl(side, idx) {
    return app.querySelector('.scm-slot[data-side="' + side + '"][data-idx="' + idx + '"]');
  }

  function damageUnit(side, idx, amount, sourceEl) {
    var unit = battle[side].board[idx];
    if (!unit || amount <= 0) return;
    unit.hp -= amount;
    var el = slotEl(side, idx);
    burst(el || sourceEl, amount);
    log(unit.name + "이(가) " + amount + " 피해를 입었습니다.");
    if (unit.hp <= 0) {
      if (unit.kind === "master") {
        endGame(side === "player" ? "lose" : "win");
        return;
      }
      battle[side].board[idx] = null;
      log(unit.name + "이(가) 쓰러졌습니다.");
    }
  }

  function healMaster(side, amount) {
    var m = masterOf(side);
    if (!m) return;
    m.hp = Math.min(m.maxHp, m.hp + amount);
    log((side === "player" ? "당신" : "상대") + " 마스터가 " + amount + " 회복했습니다.");
  }

  function applySummon(def, side) {
    if (!def.summon) return;
    if (def.summon.type === "draw") {
      for (var i = 0; i < def.summon.value; i++) drawCard(side);
    }
    if (def.summon.type === "healMaster") healMaster(side, def.summon.value);
  }

  function summonTo(side, handIdx, slotIdx) {
    var p = battle[side];
    var def = p.hand[handIdx];
    if (!def || def.type !== "creature") return false;
    if (p.mana < def.cost) return false;
    if (p.board[slotIdx]) return false;
    p.mana -= def.cost;
    p.hand.splice(handIdx, 1);
    p.board[slotIdx] = makeCreature(def, side);
    applySummon(def, side);
    log((side === "player" ? "당신" : "상대") + "이(가) " + def.name + "을(를) 소환했습니다.");
    var el = slotEl(side, slotIdx);
    if (el) fxAt(el, "", "scm-burst");
    return true;
  }

  function findMasterIndex(side) {
    var board = battle[side].board;
    for (var i = 0; i < 6; i++) if (board[i] && board[i].kind === "master") return i;
    return -1;
  }

  function attack(fromSide, fromIdx, toSide, toIdx) {
    var atk = battle[fromSide].board[fromIdx];
    var def = battle[toSide].board[toIdx];
    if (!atk || atk.kind !== "creature" || atk.exhausted) return false;
    if (!def) return false;
    if (fromSide === toSide) return false;
    if (!canAttackTarget(toSide, toIdx)) {
      hint("앞열 유닛이 뒷열을 지키고 있습니다.");
      return false;
    }
    var dmg = atk.atk + elementBonus(atk.element, def.element);
    atk.exhausted = true;
    log(atk.name + "의 공격! (" + dmg + ")");
    damageUnit(toSide, toIdx, dmg);
    return true;
  }

  function moveUnit(side, fromIdx, toIdx) {
    var board = battle[side].board;
    var unit = board[fromIdx];
    if (!unit || unit.kind !== "creature" || unit.exhausted) return false;
    if (board[toIdx]) return false;
    board[toIdx] = unit;
    board[fromIdx] = null;
    unit.exhausted = true;
    log(unit.name + "이(가) 이동했습니다.");
    return true;
  }

  function applySpell(side, def, target) {
    var p = battle[side];
    var sp = def.spell;
    if (!sp) return false;
    if (p.mana < def.cost) return false;

    if (sp.type === "draw") {
      p.mana -= def.cost;
      for (var i = 0; i < sp.value; i++) drawCard(side);
      log(def.name + "!");
      return true;
    }
    if (sp.type === "healMaster") {
      p.mana -= def.cost;
      healMaster(side, sp.value);
      log(def.name + "!");
      return true;
    }
    if (sp.type === "aoe") {
      p.mana -= def.cost;
      var other = side === "player" ? "enemy" : "player";
      for (var s = 5; s >= 0; s--) {
        var u = battle[other].board[s];
        if (u && u.kind === "creature") damageUnit(other, s, sp.value);
      }
      log(def.name + "!");
      return true;
    }

    if (!target) return false;
    var tUnit = battle[target.side].board[target.idx];
    if (!tUnit) return false;

    if (sp.target === "allyCreature" && (target.side !== side || tUnit.kind !== "creature")) return false;
    if (sp.target === "enemyCreature" && (target.side === side || tUnit.kind !== "creature")) return false;

    p.mana -= def.cost;
    if (sp.type === "damage") {
      damageUnit(target.side, target.idx, sp.value);
    } else if (sp.type === "buff") {
      tUnit.atk += sp.atk;
      tUnit.hp += sp.hp;
      tUnit.maxHp += sp.hp;
      log(tUnit.name + "이(가) +" + sp.atk + "/+" + sp.hp + " 강화되었습니다.");
    } else if (sp.type === "drain") {
      damageUnit(target.side, target.idx, sp.value);
      healMaster(side, sp.value);
    }
    log(def.name + "!");
    return true;
  }

  function playSpellFromHand(side, handIdx, target) {
    var def = battle[side].hand[handIdx];
    if (!def || def.type !== "spell") return false;
    var needsTarget = def.spell && (def.spell.type === "damage" || def.spell.type === "buff" || def.spell.type === "drain");
    if (needsTarget && !target) return false;
    if (!applySpell(side, def, target)) return false;
    battle[side].hand.splice(handIdx, 1);
    return true;
  }

  function wakeCreatures(side) {
    battle[side].board.forEach(function (u) {
      if (u && u.kind === "creature") u.exhausted = false;
    });
  }

  function startPlayerTurn(fromEnemy) {
    if (battle.over) return;
    var p = battle.player;
    if (fromEnemy) {
      battle.playerTurns += 1;
      p.maxMana = Math.min(MAX_MANA, battle.playerTurns);
      drawCard("player");
    }
    p.mana = p.maxMana;
    wakeCreatures("player");
    battle.turn = "player";
    battle.selectedHand = -1;
    battle.selectedUnit = null;
    battle.awaiting = null;
    log("당신의 턴 (마나 " + p.mana + ")");
    renderBattle();
    hint("소환 · 마법 · 공격 후 턴을 종료하세요.");
  }

  function startEnemyTurn() {
    if (battle.over) return;
    var e = battle.enemy;
    battle.enemyTurns += 1;
    e.maxMana = Math.min(MAX_MANA, battle.enemyTurns);
    e.mana = e.maxMana;
    wakeCreatures("enemy");
    drawCard("enemy");
    battle.turn = "enemy";
    battle.selectedHand = -1;
    battle.selectedUnit = null;
    battle.awaiting = null;
    log("상대의 턴 (마나 " + e.mana + ")");
    renderBattle();
    hint("상대 마스터가 수를 읽고 있습니다…");
    runAi();
  }

  function endPlayerTurn() {
    if (!battle || battle.over || battle.turn !== "player") return;
    startEnemyTurn();
  }

  function endGame(result) {
    if (!battle || battle.over) return;
    battle.over = true;
    if (aiTimer) clearTimeout(aiTimer);
    renderBattle();
    els.modal.hidden = false;
    if (result === "win") {
      els.modalTitle.textContent = "승리";
      els.modalBody.textContent = "상대 마스터를 쓰러뜨렸습니다.";
    } else {
      els.modalTitle.textContent = "패배";
      els.modalBody.textContent = "당신의 마스터가 쓰러졌습니다.";
    }
  }

  function preferSummonSlot(side) {
    var fronts = side === "player" ? [0, 1, 2] : [3, 4, 5];
    var backs = side === "player" ? [3, 5, 4] : [0, 2, 1];
    var order = fronts.concat(backs);
    for (var i = 0; i < order.length; i++) {
      if (!battle[side].board[order[i]]) return order[i];
    }
    return -1;
  }

  function pickAiSpellTarget(def) {
    if (!def.spell) return null;
    if (def.spell.type === "damage") {
      var pMaster = findMasterIndex("player");
      if (pMaster >= 0 && canAttackTarget("player", pMaster)) return { side: "player", idx: pMaster };
      for (var i = 0; i < 6; i++) {
        var u = battle.player.board[i];
        if (u && u.kind === "creature" && canAttackTarget("player", i)) return { side: "player", idx: i };
      }
      return null;
    }
    if (def.spell.target === "enemyCreature") {
      for (var j = 0; j < 6; j++) {
        if (battle.player.board[j] && battle.player.board[j].kind === "creature") {
          return { side: "player", idx: j };
        }
      }
      return null;
    }
    if (def.spell.target === "allyCreature") {
      for (var k = 0; k < 6; k++) {
        if (battle.enemy.board[k] && battle.enemy.board[k].kind === "creature") {
          return { side: "enemy", idx: k };
        }
      }
      return null;
    }
    return null;
  }

  function aiPlayOneCard() {
    var options = battle.enemy.hand
      .map(function (c, i) { return { def: c, idx: i }; })
      .filter(function (x) { return x.def.cost <= battle.enemy.mana; })
      .sort(function (a, b) { return b.def.cost - a.def.cost; });

    for (var n = 0; n < options.length; n++) {
      var item = options[n];
      var def = item.def;
      if (def.type === "creature") {
        var slot = preferSummonSlot("enemy");
        if (slot >= 0 && summonTo("enemy", item.idx, slot)) return true;
        continue;
      }
      var needs = def.spell && (def.spell.type === "damage" || def.spell.type === "buff" || def.spell.type === "drain");
      var target = needs ? pickAiSpellTarget(def) : null;
      if (needs && !target) continue;
      if (playSpellFromHand("enemy", item.idx, target)) return true;
    }
    return false;
  }

  function aiAttackOnce() {
    for (var i = 0; i < 6; i++) {
      var unit = battle.enemy.board[i];
      if (!unit || unit.kind !== "creature" || unit.exhausted) continue;
      var pMaster = findMasterIndex("player");
      if (pMaster >= 0 && canAttackTarget("player", pMaster)) {
        return attack("enemy", i, "player", pMaster);
      }
      var best = -1;
      var bestHp = 99;
      for (var t = 0; t < 6; t++) {
        var u = battle.player.board[t];
        if (u && u.kind === "creature" && canAttackTarget("player", t) && u.hp < bestHp) {
          bestHp = u.hp;
          best = t;
        }
      }
      if (best >= 0) return attack("enemy", i, "player", best);
    }
    return false;
  }

  function runAi() {
    if (!battle || battle.over) return;
    if (aiPlayOneCard()) {
      renderBattle();
      aiTimer = setTimeout(runAi, 480);
      return;
    }
    if (aiAttackOnce()) {
      renderBattle();
      aiTimer = setTimeout(runAi, 420);
      return;
    }
    aiTimer = setTimeout(function () {
      startPlayerTurn(true);
    }, 420);
  }

  function hudHtml(side) {
    var m = masterOf(side);
    var p = battle[side];
    var pct = m ? Math.max(0, Math.round((m.hp / m.maxHp) * 100)) : 0;
    var label = side === "player" ? "당신" : "상대";
    return (
      '<div class="scm-portrait">' + artSvg("master", side === "player" ? "master" : "dark") + "</div>" +
      "<div>" +
        '<div class="scm-hud-text"><strong>' + label + "</strong> HP " + (m ? m.hp : 0) + "/" + MASTER_HP +
        " · 마나 " + p.mana + "/" + p.maxMana +
        " · 덱 " + p.deck.length + "</div>" +
        '<div class="scm-hpbar"><span style="width:' + pct + '%"></span></div>' +
      "</div>"
    );
  }

  function isTargetSlot(side, idx) {
    if (!battle || battle.turn !== "player") return false;
    if (battle.awaiting === "summon" && side === "player" && !battle.player.board[idx]) return true;
    if (battle.awaiting === "move" && side === "player" && !battle.player.board[idx]) return true;
    if (battle.awaiting === "attack" && side === "player" && !battle.player.board[idx]) return true;
    if (battle.awaiting === "attack" && side === "enemy" && battle.enemy.board[idx] && canAttackTarget("enemy", idx)) return true;
    if (battle.awaiting === "spell") {
      var def = battle.player.hand[battle.selectedHand];
      if (!def || !def.spell) return false;
      var u = battle[side].board[idx];
      if (!u) return false;
      if (def.spell.target === "any") return true;
      if (def.spell.target === "allyCreature") return side === "player" && u.kind === "creature";
      if (def.spell.target === "enemyCreature") return side === "enemy" && u.kind === "creature";
    }
    return false;
  }

  function renderBoard(side, root) {
    root.innerHTML = "";
    battle[side].board.forEach(function (unit, idx) {
      var slot = document.createElement("div");
      slot.className = "scm-slot";
      slot.dataset.side = side;
      slot.dataset.idx = String(idx);
      if (isTargetSlot(side, idx)) slot.classList.add("is-target");
      if (unit) {
        var node = document.createElement("div");
        node.className = "scm-unit";
        if (unit.kind === "master") node.classList.add("is-master");
        if (unit.kind === "creature" && !unit.exhausted && battle.turn === "player" && side === "player") {
          node.classList.add("is-ready");
        }
        if (unit.exhausted && unit.kind === "creature") node.classList.add("is-spent");
        var stats = unit.kind === "master" ? "HP " + unit.hp : unit.atk + " / " + unit.hp;
        node.innerHTML =
          artSvg(unit.art, unit.kind === "master" && unit.side === "player" ? "master" : unit.element) +
          '<div class="scm-unit-name">' + (unit.kind === "master" ? "마스터" : unit.name) + "</div>" +
          '<div class="scm-unit-stats">' + stats + "</div>";
        slot.appendChild(node);
      }
      slot.addEventListener("click", function () { onSlot(side, idx); });
      root.appendChild(slot);
    });
  }

  function renderBattle() {
    if (!battle) return;
    els.hudEnemy.innerHTML = hudHtml("enemy");
    els.hudPlayer.innerHTML = hudHtml("player");
    els.turnBanner.textContent = battle.turn === "player" ? "당신의 턴" : "상대 턴";
    els.endTurn.disabled = battle.turn !== "player" || battle.over;
    renderBoard("enemy", els.boardEnemy);
    renderBoard("player", els.boardPlayer);

    els.hand.innerHTML = "";
    battle.player.hand.forEach(function (def, idx) {
      var poor = def.cost > battle.player.mana || battle.turn !== "player";
      els.hand.appendChild(renderCard(def, {
        selected: battle.selectedHand === idx,
        disabled: poor && battle.selectedHand !== idx,
        onClick: function () { onHand(idx); }
      }));
    });

    els.log.innerHTML = battle.log.map(function (line) {
      return "<li>" + line + "</li>";
    }).join("");
  }

  function clearSelection() {
    battle.selectedHand = -1;
    battle.selectedUnit = null;
    battle.awaiting = null;
  }

  function onHand(idx) {
    if (!battle || battle.over || battle.turn !== "player") return;
    var def = battle.player.hand[idx];
    if (!def) return;
    if (def.cost > battle.player.mana) {
      hint("마나가 부족합니다.");
      return;
    }
    if (battle.selectedHand === idx) {
      clearSelection();
      renderBattle();
      hint("카드를 고른 뒤 빈 칸에 소환하거나, 준비된 생물을 눌러 공격하세요.");
      return;
    }
    battle.selectedHand = idx;
    battle.selectedUnit = null;
    if (def.type === "creature") {
      battle.awaiting = "summon";
      hint(def.name + "을(를) 소환할 빈 칸을 선택하세요.");
    } else {
      var needs = def.spell && (def.spell.type === "damage" || def.spell.type === "buff" || def.spell.type === "drain");
      if (!needs) {
        playSpellFromHand("player", idx, null);
        clearSelection();
        renderBattle();
        return;
      }
      battle.awaiting = "spell";
      hint(def.name + "의 대상을 선택하세요.");
    }
    renderBattle();
  }

  function onSlot(side, idx) {
    if (!battle || battle.over || battle.turn !== "player") return;
    var unit = battle[side].board[idx];

    if (battle.awaiting === "summon") {
      if (side !== "player" || unit) {
        hint("내 필드 빈 칸에만 소환할 수 있습니다.");
        return;
      }
      summonTo("player", battle.selectedHand, idx);
      clearSelection();
      renderBattle();
      return;
    }

    if (battle.awaiting === "spell") {
      if (playSpellFromHand("player", battle.selectedHand, { side: side, idx: idx })) {
        clearSelection();
      } else {
        hint("그 대상에는 쓸 수 없습니다.");
      }
      renderBattle();
      return;
    }

    if (battle.awaiting === "attack" && battle.selectedUnit) {
      if (side === "player" && !unit) {
        moveUnit("player", battle.selectedUnit.idx, idx);
        clearSelection();
        renderBattle();
        return;
      }
      if (side === "enemy" && unit) {
        attack("player", battle.selectedUnit.idx, "enemy", idx);
        clearSelection();
        renderBattle();
        return;
      }
    }

    if (side === "player" && unit && unit.kind === "creature" && !unit.exhausted) {
      battle.selectedHand = -1;
      battle.selectedUnit = { side: "player", idx: idx };
      battle.awaiting = "attack";
      hint(unit.name + " — 적 유닛을 공격하거나, 빈 칸으로 이동하세요.");
      renderBattle();
      return;
    }

    clearSelection();
    renderBattle();
  }

  app.addEventListener("click", function (ev) {
    var btn = ev.target.closest("[data-action]");
    if (!btn) return;
    var action = btn.getAttribute("data-action");
    if (action === "title") {
      if (aiTimer) clearTimeout(aiTimer);
      battle = null;
      showScreen("title");
    } else if (action === "howto") {
      showScreen("howto");
    } else if (action === "deck") {
      showScreen("deck");
    } else if (action === "reset-deck") {
      deckIds = DEFAULT_DECK.slice();
      saveDeck();
      renderDeckEditor();
    } else if (action === "duel") {
      startDuel();
    } else if (action === "end-turn") {
      endPlayerTurn();
    } else if (action === "surrender") {
      endGame("lose");
    }
  });

  showScreen("title");
})();
