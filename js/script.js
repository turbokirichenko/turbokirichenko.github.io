

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

p.onclick = ChangeState;
linkopen.onclick = OpenEyes;
changepage.onclick = ChangePage;
back.onclick = ChangePage;
square_9.onclick = BtcAddress;
LoadTextMessage("yep! fonts:'Patrick Hand','Redacted Script'");
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
		grids.display='block';
		IncreaseUniverse().then((res)=>{
			LoadTextMessage("Just my metaverse");
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
			var links = document.getElementsByClassName('HiddenBlock');;
			timerId = setInterval(function () {
				counter+=2;
				image.src = (more == 0)
					? './svg/icons/humanopen.svg'
					: './svg/icons/humanclose.svg';
				var localOpacity = (more == 0)
					? counter/100.
					: 1 - counter/100.
				Array.from(links).forEach(function (element) {
					element.style.opacity = localOpacity;
				});

				if(counter>=100){
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
		LoadTextMessage("Contacts");
		if(res) {
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


