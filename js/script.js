function O(i){
	return typeof i == 'object' ? i : document.getElementById(i)
}

function S(i){
	return O(i).style
}

function C(i){
	return document.getElementByClassName(i)
}

//global
var currentState = 0;
var working = false;
var more = false;
var currentPage = 0;

var site = S('_site');

var currentWindowWidth = window.innerWidth + 'px';
var currentWindowHeight = window.innerHeight + 'px';

site.height = currentWindowHeight;

var orbitals = [
	S('_planet_1'),
	S('_planet_2'),
	S('_planet_3'),
	S('_planet_4'),
	S('_planet_5'),
	S('_planet_6'),
	S('_planet_7')
]

var planet_system = S('_space_system_block');

var planetsWidth = planet_system.width;
var planetsHeight = planet_system.height;

var title = S('_title_block');
var grids = S('_linksquare_block');
grids.display = 'none';
var background = S('_image_background');


var p = O('_point');
var linkopen = O('_square_4');
var changepage = O('_square_6');
var back = O('_button_container');
var square_9 = O('_square_9');
var lock_vk = O('_square_1');
var lock_inst = O('_square_3');

p.onclick = ChangeState;
linkopen.onclick = OpenEyes;
changepage.onclick = ChangePage;
back.onclick = ChangePage;
square_9.onclick = BtcAddress;

setTimeout(function () {
	S('_hint_1').display = 'block';
}, 1200);

LoadTextMessage("Welcome to my website!");
function CompressUniverse () {
	if(working){ return new Promise((resolve)=>{resolve(false)}) }
	return new Promise((resolve, reject) => {
		working = true;
		var counter = 0;
		var interval = 30;
		var curWidth = window.innerWidth / 2 + 100;
		var curHeight = window.innerHeight / 2 + 100;
		var planetBox = window.innerWidth > 400 ? 500 : 300;
		var timerId = setInterval(function() {

			//increase counter
			counter += 3;

			//change opacity
			var opacity = counter/100.0
			console.log(opacity);

			title.opacity = opacity;
			if(opacity < 0.5) grids.opacity = 1 - (opacity)*2;

			//change dimention
			var localWidth = 1.0*planetBox*(100-counter)/100.;
			var localHeight = 1.0*planetBox*(100-counter)/100.;

			planet_system.width = localWidth + 'px';
			planet_system.height = localHeight + 'px';

			orbitals.forEach(function (element) {
				element.width = localWidth + 'px';
				element.height = localHeight + 'px';
			});

			//change dimention background
			var backgroundDimen = (curHeight > curWidth) 
				? 2*curHeight*(100-counter)/100. 
				: 2*curWidth*(100-counter)/100.

			background.width = backgroundDimen + 'px';
			background.height = backgroundDimen + 'px';

			//exit
			if(counter > 100) {
				LoadStateZero();
				working = false;
				resolve(true);
				clearInterval(timerId);
			}

		}, interval);
	})
}

function IncreaseUniverse () {
	if(working){ return new Promise((resolve)=>{resolve(false)}) }
	return new Promise((resolve, reject) => {
		working = true;
		var counter = 0;
		var interval = 30;
		var curWidth = window.innerWidth / 2 + 100;
		var curHeight = window.innerHeight / 2 + 100;
		var planetBox = window.innerWidth > 400 ? 500 : 300;
		var timerId = setInterval(function() {
			counter += 3;

			var opacity = counter/100.0
			console.log(opacity);

			title.opacity = 1 - opacity;
			if(opacity > 0.5) grids.opacity = (opacity-0.5)*2;

			var localWidth = planetBox*(counter)/100.;
			var localHeight = planetBox*(counter)/100.;

			planet_system.width = localWidth + 'px';
			planet_system.height = localHeight + 'px';

			orbitals.forEach(function (element) {
				element.width = localWidth + 'px';
				element.height = localHeight + 'px';
			});

			//change dimention background
			var backgroundDimen = (curHeight > curWidth) 
				? 2*curHeight*(counter)/100. 
				: 2*curWidth*(counter)/100.

			background.width = backgroundDimen + 'px';
			background.height = backgroundDimen + 'px';

			if(counter > 100) {
				LoadStateOne();
				working = false;
				resolve(true);
				clearInterval(timerId);
			}

		}, interval);
	})
}



function LoadTextMessage(text){
	return new Promise((resolve, reject)=>{
		var textarea = O('_internal_text');
		var len = text.length;
		var count = -1;
		textarea.innerHTML = '';
		var currentText = '';
		if(working){
			resolve(true);
		}
		else var timeId = setInterval(function() {
			count+=1
			if(count == len){
				console.log(currentText);
				clearInterval(timeId);
				return
			}
			currentText = currentText + text.charAt(count);
			textarea.innerHTML = currentText;
		}, 60);
	});
}


function LoadStateZero() {
	return new Promise((resolve, reject) => {

		//set second state
		title.opacity = 1;
		grids.opacity = 0;

		orbitals.forEach(function (element) {
			element.width = '7px';
			element.height = '7px';
		});

		resolve(true);
	});
}

function LoadStateOne() {
	return new Promise((resolve, reject) => {

		//set second state
		title.opacity = 0;
		grids.opacity = 1;

		orbitals.forEach(function (element) {
			element.width = '100%';
			element.height = '100%';
		});

		resolve(true);
	});
}


function ChangeState(event) {

	if(currentState == 0) {
		S('_hint_1').display = 'none';
		grids.display='block';
		IncreaseUniverse().then((res)=>{
			LoadTextMessage("Just my metaverse");
			S('_hint_1').display = 'none';
			if (res) currentState = 1;
		});
		return;
	}

	if(currentState == 1) {
		CompressUniverse().then((res)=>{
			grids.display='none';
			LoadTextMessage("Bye Bye! See you later!");
			if (res) currentState = 0;
		});
		return;
	}
}

function BtcAddress(event) {

	LoadTextMessage("mvwWrWtiToK6RJ1iyQh1EgQpWgJwV2NgVv");
}


function LoadHiddenLinks(){
	return new Promise((resolve)=>{
		if(working){
			resolve(false);
		} else {
			working = true;
			var image = O('_guy_image');
			var counter = 0;
			var links = document.getElementsByClassName('HiddenBlock');
			var anch = document.getElementsByClassName('InternalLink');
			if(more == 0) Array.from(anch).forEach(function (element) {
				element.style.display = 'block';
			});
			image.src = (more == 0)
					? './svg/icons/humanopen.svg'
					: './svg/icons/humanclose.svg';
			timerId = setInterval(function () {
				counter+=2;
				var localOpacity = (more == 0)
					? counter/100.
					: 1 - counter/100.
				Array.from(links).forEach(function (element) {
					element.style.opacity = localOpacity;
				});

				if(counter>=100){
					if(more == 1) Array.from(anch).forEach(function (element) {
						element.style.display = 'none';
					});
					more == 0 ? more = 1 : more = 0;
					working = false;
					clearInterval(timerId);
					resolve(true);
				}

			}, 10);
		}
	});
}


function OpenEyes() {
	LoadHiddenLinks().then(function (res) {
		if(res) {
			more == 0? LoadTextMessage("Just my metaverse") : LoadTextMessage("Contacts");
		}
	})
}


function ChangePage() {
	var first = S('_first_page');
	var second = S('_second_page');

	if(currentPage == 0) {
		first.display = 'none';
		second.display = 'block';
		currentPage = 1;
	} else {
		first.display = 'block';
		second.display = 'none';
		currentPage = 0;
	}
}

//crypto 

function Unlocked () {
	var cipher_1 = 'vk';
	var cipher_2 = 'in';

	//get params
	var params = window.location.search.substring(1).split("&");
	var result = new Map();
	for(i = 0; i < params.length; i ++) {
		var val = params[i].split("=");
		result.set(val[0], val[1]);
	}

	//check params
	//if not exist
	if(!result.get('k')) {

		return 0;
	}

	console.log('key: ' + result.get('k'));
}

async function OnceEncrypt () {
	var key = await window.crypto.subtle.generateKey({
			name: 'AES-GCM',
			length: 256,
		}, true, ['encrypt', 'decrypt']);
	var iv = new Uint8Array(12); //window.crypto.getRandomValues(new Uint8Array(12));
	console.log(key);
	var link_vk = 'https://vk.com/0x0000000a/';
	var link_inst = 'https://www.instagram.com/ReiiiAnd/';
	var enc_vk = encode(link_vk);
	var enc_inst = encode(link_inst);
	var cipher_vk = await window.crypto.subtle.encrypt({
		name: 'AES-GCM',
		iv,
	}, key, enc_vk);
	var cipher_inst = await window.crypto.subtle.encrypt({
		name: 'AES-GCM',
		iv,
	}, key, enc_inst);
	 function toHex(str) {
	    var result = '';
	    for (var i=0; i < str.length; i++) {
	      result += str.charCodeAt(i).toString(16);
	    }
	    return result;
	  }
	var str = String.fromCharCode.apply(null, new Uint8Array(cipher_vk));
	var hex = toHex(str);
	console.log(hex);
}

function decripts(word, key){
			var fri = new String("");
			var Mask = new String(key);
			var i=0;
			var j=0;
			for(i=0;i < word.length; i++)
					{
					var c = word.charAt(i);
					var com = c.charCodeAt(0)^Mask.charCodeAt(j);
					c = String.fromCharCode(com);
					fri += c;
					if(j==Mask.length-1)j=0; else j++;
					}
			return fri;
		}
 function toHex(str) {
	    var result = '';
	    for (var i=0; i < str.length; i++) {
	      var c = str.charCodeAt(i).toString(16);
	      result+=c;
	    }
	    return result;
}
function encode(data) {
		var encoder = new TextEncoder()
		return encoder.encode(data)
	}
console.log(encode(decripts(('https://vk.com/0x0000000a/'), '1234')));



//OnceEncrypt();
//Unlocked();