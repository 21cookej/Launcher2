// Not Added Feature 
function errorNA(text) {
  clearTimeout()
  document.getElementById('errortext').innerHTML = "The " + text + " feature hasn't been made yet."
  document.getElementById('naerror').style.display = 'block';
  setTimeout(function(){
      document.getElementById('naerror').classList.add('zoom-out');
  }, 3000);
  setTimeout(function(){
      document.getElementById('naerror').classList.remove('zoom-out');
      document.getElementById('naerror').style.display = 'none';
      document.getElementById('errortext').innerHTML = "This feature hasn't been made yet."
  }, 3200);
}
// Last Played Game Option
let selectedGame1 = localStorage.getItem("basegame");
let selectedGame2 = localStorage.getItem("moddedgame");
let selectedGame3 = localStorage.getItem("assisted");
let selectedGame4 = localStorage.getItem("builder");
let modslauncher
if (localStorage.getItem("modslauncher")) {modslauncher = JSON.parse(localStorage.getItem("modslauncher"))};

function generateprofile(game) {
  let selectedGame = "";
  let running = false;
  if (!selectedGame1) {
      fetch("https://cool-launcher2.vercel.app/assets/json/base.json").then((response) => response.json()).then((data) => {
          selectedGame1 = JSON.stringify(data[0]); localStorage.setItem("basegame", selectedGame1);
      });
  };
  if (game === 1 && selectedGame1) {selectedGame = JSON.parse(selectedGame1);  running = true;}; 
  if (!selectedGame2) {
      fetch("https://cool-launcher2.vercel.app/assets/json/modded.json").then((response) => response.json()).then((data) => {
          selectedGame2 = JSON.stringify(data[0]); localStorage.setItem("moddedgame", selectedGame2);
      });
  };
  if (game === 2 && selectedGame2) {selectedGame = JSON.parse(selectedGame2);  running = true;}; 
  if (!selectedGame3) {
      fetch("https://cool-launcher2.vercel.app/assets/json/assisted.json").then((response) => response.json()).then((data) => {
          selectedGame3 = JSON.stringify(data[0]); localStorage.setItem("assisted", selectedGame3);
      });
  };
  if (game === 3 && selectedGame3) {selectedGame = JSON.parse(selectedGame3);  running = true;};
  if (!selectedGame4) {
      fetch("https://cool-launcher2.vercel.app/assets/json/builder.json").then((response) => response.json()).then((data) => {
          selectedGame4 = JSON.stringify(data[0]); localStorage.setItem("builder", selectedGame4);
      });
  };
  if (game === 4 && selectedGame4) {selectedGame = JSON.parse(selectedGame4);  running = true;}; 
  
  if (running === true) {
  document.getElementById('gametitle').innerHTML = selectedGame.title;
  document.getElementById('gameversion').innerHTML = selectedGame.version;
  document.getElementById('gameicon').src = selectedGame.icon;
  document.getElementById('playbutton').href = selectedGame.link;
  }
  if (!modslauncher) {
      localStorage.setItem("modslauncher", "");
      modslauncher = [];
  }
};

// Generate Game Options
const dropdown = document.getElementById("dropdn");
function generategames(path) {
  let margincount = 0;
  fetch(path).then((response) => response.json()).then((data) => {
      data.reverse();
      data.forEach((game) => {
          if (!localStorage.getItem(game.title) && game.active === false) {localStorage.setItem(game.title, game.active); return};
          if (localStorage.getItem(game.title) === 'false') {return};
          const gameoption = document.createElement("div");
          gameoption.className = "dropdownOptions";
          gameoption.style.bottom = margincount + "vw";
          gameoption.addEventListener("click", () => {
              document.getElementById('gametitle').innerHTML = game.title;
              document.getElementById('gameversion').innerHTML = game.version;
              document.getElementById('gameicon').src = game.icon;
              document.getElementById('playbutton').href = game.link;
              if (path === "https://cool-launcher2.vercel.app/assets/json/base.json") {selectedGame1 = JSON.stringify(game); localStorage.setItem("basegame", selectedGame1)};
              if (path === "https://cool-launcher2.vercel.app/assets/json/modded.json") {selectedGame2 = JSON.stringify(game); localStorage.setItem("moddedgame", selectedGame2)};
              if (path === "https://cool-launcher2.vercel.app/assets/json/assisted.json") {selectedGame3 = JSON.stringify(game); localStorage.setItem("assisted", selectedGame3)};
              if (path === "https://cool-launcher2.vercel.app/assets/json/builder.json") {selectedGame4 = JSON.stringify(game); localStorage.setItem("builder", selectedGame4)};
              dropdowntoggle();
          });
      
          const gameoptioninner = document.createElement("div");
          gameoptioninner.className = "dropdownOption";
          const gameoptionicon = document.createElement("img");
          gameoptionicon.src = game.icon;
      
          const gameoptiontext = document.createElement("div");
          gameoptiontext.className = "dropdownOptionText";
          const gameoptiontitle = document.createElement("p");
          gameoptiontitle.className = "bolded";
          gameoptiontitle.innerHTML = game.title;
          const gameoptionversion = document.createElement("p");
          gameoptionversion.innerHTML = game.version;
      
          gameoptiontext.appendChild(gameoptiontitle);
          gameoptiontext.appendChild(gameoptionversion);
          gameoptioninner.appendChild(gameoptionicon);
          gameoptioninner.appendChild(gameoptiontext);
          gameoption.appendChild(gameoptioninner);
          dropdown.appendChild(gameoption);
          margincount = margincount + 5;
      }
      )
  })
};

const mods = document.getElementById("modsbox");
function generatemods() {
  fetch("https://cool-launcher2.vercel.app/assets/json/mods.json").then((response) => response.json()).then((data) => {
      data.forEach((mod) => {
          const modoption = document.createElement("div");
          modoption.className = "modoption";
          modoption.addEventListener("click", () => {
              if (localStorage.getItem(mod.title) === 'true') {
                  mod.active = false; 
                  localStorage.setItem(mod.title, mod.active); 
                  modoption.classList.remove("selected"); 
                  modslauncher = modslauncher.filter(obj => obj !== mod.link); 
                  localStorage.setItem("modslauncher", JSON.stringify(modslauncher.filter(obj => obj !== mod.link))); 
                  console.log("Off")
              } 
              else {
                  mod.active = true; 
                  localStorage.setItem(mod.title, mod.active); 
                  modoption.classList.add("selected"); 
                  modslauncher.push(mod.link); 
                  localStorage.setItem("modslauncher", JSON.stringify(modslauncher)); 
                  console.log("On")} 
          });
          if (localStorage.getItem(mod.title) === 'true') {
              modoption.classList.add("selected");
          }
          const modoptionimg = document.createElement("img");
          modoptionimg.src = mod.icon;

          const moddetails = document.createElement("div");
          moddetails.className = "moddetails";
          const moddetailtitle = document.createElement("p");
          moddetailtitle.className = "bolded modtitle";
          moddetailtitle.innerHTML = mod.title;
          const moddetailauthor = document.createElement("p");
          moddetailauthor.className = "modauthor";
          moddetailauthor.innerHTML = mod.author;
          const moddetaildesc = document.createElement("p");
          moddetaildesc.innerHTML = mod.description;

          moddetails.appendChild(moddetailtitle);
          moddetails.appendChild(moddetailauthor);
          moddetails.appendChild(moddetaildesc);
          modoption.appendChild(modoptionimg);
          modoption.appendChild(moddetails);
          mods.appendChild(modoption);
      }
      )
  })
};

const servers = document.getElementById("serversbox");

function generateservers() {
  // Clear previous server options first
  servers.innerHTML = "";

  fetch("https://cool-launcher2.vercel.app/assets/json/servers.json")
      .then((response) => response.json())
      .then((data) => {
          data.forEach((server) => {
              const serveroption = document.createElement("div");
              serveroption.className = "serveroption";

              // Copy server link when clicked
              serveroption.addEventListener("click", () => {
                  navigator.clipboard.writeText(server.link)
                      .then(() => {
                          console.log(`Copied: ${server.link} to Clipboard`);
                          showCopiedPopup();
                      })
                      .catch((err) => console.error("Failed to copy: ", err));
              });

              //const serveroptionimg = document.createElement("img");
              //serveroptionimg.src = server.icon; // use the icon from JSON

              const serverdetails = document.createElement("div");
              serverdetails.className = "serverdetails";

              const serverdetailtitle = document.createElement("p");
              serverdetailtitle.className = "bolded servertitle";
              serverdetailtitle.innerHTML = server.title;

              const serverdetailauthor = document.createElement("p");
              serverdetailauthor.className = "serverauthor";
              serverdetailauthor.innerHTML = server.author || "";

              const serverdetaildesc = document.createElement("p");
              serverdetaildesc.innerHTML = server.description;

              serverdetails.appendChild(serverdetailtitle);
              serverdetails.appendChild(serverdetailauthor);
              serverdetails.appendChild(serverdetaildesc);

              serveroption.appendChild(serveroptionimg);
              serveroption.appendChild(serverdetails);
              servers.appendChild(serveroption);
          });
      })
      .catch(err => console.error("Failed to load servers:", err));
}

// Function to show a green "Copied" popup
function showCopiedPopup() {
  const popup = document.createElement("div");
  popup.innerText = "Copied To Clipboard";
  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.right = "20px";
  popup.style.backgroundColor = "#54ac00";
  popup.style.color = "white";
  popup.style.padding = "10px 20px";
  popup.style.borderRadius = "5px";
  popup.style.fontWeight = "bold";
  popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.9)";
  popup.style.zIndex = "9999";
  popup.style.opacity = "1";
  popup.style.transition = "opacity 0.5s ease-out";

  document.body.appendChild(popup);

  // Fade out after 1 second
  setTimeout(() => {
      popup.style.opacity = "0";
      setTimeout(() => document.body.removeChild(popup), 500);
  }, 1000);
}


const skins = document.getElementById("skinsbox");

function generateskins() {
    // Clear previous skin options
    skins.innerHTML = "";

    fetch("https://cool-launcher2.vercel.app/assets/json/skins.json")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((skin) => {
                const skinoption = document.createElement("div");
                skinoption.className = "skinoption";

                const skinoptionimg = document.createElement("img");
                skinoptionimg.src = skin.icon; // Preview image from JSON

                const skindetails = document.createElement("div");
                skindetails.className = "skindetails";

                const skindetailtitle = document.createElement("p");
                skindetailtitle.className = "bolded skintitle";
                skindetailtitle.innerHTML = skin.title;

                const skindetailauthor = document.createElement("p");
                skindetailauthor.className = "skinauthor";
                skindetailauthor.innerHTML = skin.author || "";

                const skindetaildesc = document.createElement("p");
                skindetaildesc.innerHTML = skin.description;

                // Download (open) button
                const downloadBtn = document.createElement("button");
                downloadBtn.innerText = "Download";
                downloadBtn.style.backgroundColor = "green";
                downloadBtn.style.color = "white";
                downloadBtn.style.border = "none";
                downloadBtn.style.padding = "6px 12px";
                downloadBtn.style.cursor = "pointer";
                downloadBtn.style.marginTop = "6px";
                downloadBtn.style.borderRadius = "6px";

                downloadBtn.addEventListener("click", () => {
                    window.open(skin.file, "_blank"); // open in new tab
                    console.log(`Opened in new tab: ${skin.file}`);
                    showDownloadedPopup();
                });

                skindetails.appendChild(skindetailtitle);
                skindetails.appendChild(skindetailauthor);
                skindetails.appendChild(skindetaildesc);
                skindetails.appendChild(downloadBtn);

                skinoption.appendChild(skinoptionimg);
                skinoption.appendChild(skindetails);
                skins.appendChild(skinoption);
            });
        })
        .catch(err => console.error("Failed to load skins:", err));
}

// Popup like before
function showDownloadedPopup() {
    const popup = document.createElement("div");
    popup.innerText = "Opened in new tab!";
    popup.style.position = "fixed";
    popup.style.bottom = "20px";
    popup.style.right = "20px";
    popup.style.background = "#4caf50";
    popup.style.color = "white";
    popup.style.padding = "10px 20px";
    popup.style.borderRadius = "8px";
    popup.style.boxShadow = "0px 4px 6px rgba(0,0,0,0.2)";
    document.body.appendChild(popup);

    setTimeout(() => popup.remove(), 2000);
}




const installations = document.getElementById("installationsbox");
function generatelaunchers(path) {
  fetch(path).then((response) => response.json()).then((data) => {
      const gamedividertop = document.createElement("hr");
      installations.appendChild(gamedividertop);
      data.forEach((game) => {
          const gameoption = document.createElement("div");
          gameoption.className = "installationOptions";
          const gameoptioninner = document.createElement("div");
          gameoptioninner.className = "installationOption";

          const gameinput = document.createElement("input");
          gameinput.className = "installationBox";
          gameinput.type = "checkbox";
          gameoption.addEventListener("click", () => {
              if (gameinput.checked) {game.active = false; localStorage.setItem(game.title, game.active); gameinput.checked = ""; console.log("Off")} 
              else {game.active = true; localStorage.setItem(game.title, game.active); gameinput.checked = "checked"; console.log("On")} 
          });
          if (!localStorage.getItem(game.title)) {
              localStorage.setItem(game.title, game.active);
          }
          if (localStorage.getItem(game.title) === 'true') {
              gameinput.checked = "checked";
          }

          const gameoptionicon = document.createElement("img");
          gameoptionicon.src = game.icon;
      
          const gameoptiontext = document.createElement("div");
          gameoptiontext.className = "installationOptionText";
          const gameoptiontitle = document.createElement("p");
          gameoptiontitle.className = "bolded";
          gameoptiontitle.innerHTML = game.title;
          const gameoptionversion = document.createElement("p");
          gameoptionversion.innerHTML = game.version;
          const gamedivider = document.createElement("hr");

          gameoptiontext.appendChild(gameoptiontitle);
          gameoptiontext.appendChild(gameoptionversion);
          gameoptioninner.appendChild(gameinput);
          gameoptioninner.appendChild(gameoptionicon);
          gameoptioninner.appendChild(gameoptiontext);
          gameoption.appendChild(gameoptioninner);
          installations.appendChild(gameoption);
          installations.appendChild(gamedivider);
      }
      )
  })
};

const faqs = document.getElementById("faqbox");
function generatefaqs() {
  fetch("https://cool-launcher2.vercel.app/assets/json/faqs.json").then((response) => response.json()).then((data) => {
      data.forEach((game) => {
          const faqoption = document.createElement("div");
          faqoption.className = "faqoption";

          const faqquestion = document.createElement("div");
          faqquestion.className = "bolded faqtext";
          const faqquestionsymbol = document.createElement("p");
          faqquestionsymbol.className = "faqsymbol";
          faqquestionsymbol.innerHTML = "Q";
          const faqquestiontext = document.createElement("p");
          faqquestiontext.innerHTML = game.question;

          const faqanswer = document.createElement("div");
          faqanswer.className = "faqtext";
          const faqanswersymbol = document.createElement("p");
          faqanswersymbol.className = "bolded faqsymbol";
          faqanswersymbol.innerHTML = "A";
          const faqanswertext = document.createElement("p");
          faqanswertext.innerHTML = game.answer;

          faqquestion.appendChild(faqquestionsymbol);
          faqquestion.appendChild(faqquestiontext);
          faqanswer.appendChild(faqanswersymbol);
          faqanswer.appendChild(faqanswertext);
          faqoption.appendChild(faqquestion);
          faqoption.appendChild(faqanswer);
          faqs.appendChild(faqoption);
      }
      )
  })
};

const notes = document.getElementById("patchnotesbox");
const notescreen = document.getElementById("notescreen");
function generatenotes() {
  fetch("https://cool-launcher2.vercel.app/assets/json/patchnotes.json").then((response) => response.json()).then((data) => {
      data.forEach((note) => {
          const patchnote = document.createElement("div");
          patchnote.className = "patchnote";
          patchnote.setAttribute('data-note-type', note.type);
          patchnote.addEventListener("click", () => {
              const notescreenheader = document.createElement("div");
              notescreenheader.className = "bolded notescreenheader";
              notescreenheader.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" onclick="closenotescreen()"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M18 6l-12 12" /><path d="M6 6l12 12" /></svg>`
              const notescreenheadertitle = document.createElement("p");
              notescreenheadertitle.innerHTML = "Patch Notes " + note.title + " " + note.version;
              const notescreenhr = document.createElement("hr");

              const notescreendetails = document.createElement("div");
              notescreendetails.className = "notescreendetails";
              const notescreendate = document.createElement("p");
              notescreendate.className = "date";
              notescreendate.innerHTML = note.date;
              const notescreendescription = document.createElement("p");
              notescreendescription.className = "bolded notescreenheader";
              notescreendescription.innerHTML = note.description;

              const notescreenlist = document.createElement("ul");
              note.notes.forEach((item) => {
                  const noteitem = document.createElement("li");
                  noteitem.innerHTML = item;
                  notescreenlist.appendChild(noteitem);
              });

              notescreenheader.prepend(notescreenheadertitle);
              notescreendetails.appendChild(notescreendate);
              notescreendetails.appendChild(notescreendescription);
              notescreendetails.appendChild(notescreenlist);
              notescreen.appendChild(notescreenheader);
              notescreen.appendChild(notescreenhr);
              notescreen.appendChild(notescreendetails);
              notescreen.style.display = "flex";
          });

          const patchnoteimg = document.createElement("img");
          patchnoteimg.src = note.icon;

          const patchnotedetails = document.createElement("div");
          patchnotedetails.className = "bolded patchnotedetails";
          const notedetailtitle = document.createElement("p");
          notedetailtitle.innerHTML = note.title;
          const notedetailversion = document.createElement("p");
          notedetailversion.innerHTML = note.version;

          patchnotedetails.appendChild(notedetailtitle);
          patchnotedetails.appendChild(notedetailversion);
          patchnote.appendChild(patchnoteimg);
          patchnote.appendChild(patchnotedetails);
          notes.appendChild(patchnote);
      }
      )
  })
};

// Patchnote Functions

let gamenote = sitenote = true;
function sortnote(type) {
  if (type === "game") {
      if (gamenote == true) { document.querySelectorAll('[data-note-type="game"]').forEach(element => {element.style.display = 'none';}); gamenote = false;}
      else if (gamenote == false) { document.querySelectorAll('[data-note-type="game"]').forEach(element => {element.style.display = 'flex';}); gamenote = true;}
  };
  if (type === "site") {
      if (sitenote == true) { document.querySelectorAll('[data-note-type="site"]').forEach(element => {element.style.display = 'none';}); sitenote = false; }
      else if (sitenote == false) { document.querySelectorAll('[data-note-type="site"]').forEach(element => {element.style.display = 'flex';}); sitenote = true; }
  };
}

function closenotescreen() {
  notescreen.style.display = "none";
  while (notescreen.firstChild) {notescreen.removeChild(notescreen.firstChild)};
}

// Game Edition Selected
let launcher = "https://cool-launcher2.vercel.app/assets/json/base.json";
function webedition(){
  launcher = "https://cool-launcher2.vercel.app/assets/json/base.json";
  resetTabSelected();
  generateprofile(1);
  generategames(launcher);
  generatelaunchers(launcher);
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/web-edition.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/web-title.png';
  document.getElementById('gameedition').innerHTML = 'EAGLERCRAFT WEB EDITION';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gtabs2').classList.add('selected');
}
function moddededition(){
  launcher = "https://cool-launcher2.vercel.app/assets/json/modded.json";
  resetTabSelected();
  generateprofile(2);
  generategames(launcher);
  generatelaunchers(launcher);
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/modded-edition.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/modded-title.png';
  document.getElementById('gameedition').innerHTML = 'EAGLERCRAFT MODDED';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gtabs3').classList.add('selected');
}

function serverTab(){
  launcher = "https://cool-launcher2.vercel.app/assets/json/servers.json";
  resetTabSelected();
  generateprofile(2);
  generateservers();
  document.getElementById('game-bg').style.display = 'none';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/serverketplace-title.png';
  document.getElementById('gameedition').innerHTML = 'EAGLERCRAFT SERVERS';
  document.getElementById('header1').style.display = 'none';
  document.getElementById('game-title').style.display = 'none';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header3').style.display = 'none';
  document.getElementById('header4').style.display = 'none';
  document.getElementById('header5').style.display = 'none';
  document.getElementById('header6').style.display = 'none';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.querySelector(".informationBox").style.display = "none";
  document.getElementById('header11').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';
  document.getElementById('servers').style.display = "flex";
  document.getElementById('gtabs8').classList.add('selected');
}
function eaglercontrols(){
  launcher = "https://cool-launcher2.vercel.app/assets/json/assisted.json";
  resetTabSelected();
  generateprofile(3);
  generategames(launcher);
  generatelaunchers(launcher);
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/controls-edition.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/controls-title.png';
  document.getElementById('gameedition').innerHTML = 'EAGLERCRAFT MOBILE/CONTROLLER';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gtabs4').classList.add('selected');
}

function settingsTab() {
  resetTabSelected();
  resetHeaderSelected(); // just clear everything
  generategames(launcher);
  generatelaunchers(launcher);
  resetHeaderSelected(); // ✅ hides everything

  // ✅ Show the General section immediately
  document.getElementById('general').style.display = "flex";
  document.getElementById('header1').style.display = 'none';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header3').style.display = 'none';
  document.getElementById('header4').style.display = 'none';
  document.getElementById('header5').style.display = 'none';
  document.getElementById('header6').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gameSelection').style.display = 'none';
  document.querySelector(".informationBox").style.display = "none";

  // ✅ Select the Settings header
  document.getElementById('header7').classList.add('selected');

  // ✅ Highlight the General tab inside settings
  document.getElementById('gtabs6').classList.add('selected');

  // (optional) update background/title for Settings if you want
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/settings-bg.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/settings-title.png';
  document.getElementById('gameedition').innerHTML = 'SETTINGS';
}

function creditsTab() {
  resetTabSelected();
  resetHeaderSelected(); // just clear everything
  generategames(launcher);
  generatelaunchers(launcher);
  resetHeaderSelected(); // ✅ hides everything

  // ✅ Show the General section immediately
  document.getElementById('header1').style.display = 'none';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header3').style.display = 'none';
  document.getElementById('header4').style.display = 'none';
  document.getElementById('header5').style.display = 'none';
  document.getElementById('header6').style.display = 'none';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gameSelection').style.display = 'none';
  document.getElementById('credit').style.display = "flex";
  document.getElementById('header10').classList.add('selected');
  document.querySelector(".informationBox").style.display = "none";
  document.getElementById('gtabs5').classList.add('selected');

  // (optional) update background/title for Settings if you want
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/credits-bg.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/credits-title.png';
  document.getElementById('gameedition').innerHTML = 'CREDITS';
}

function eaglerbuilder(){
  launcher = "https://cool-launcher2.vercel.app/assets/json/builder.json";
  resetTabSelected();
  generateprofile(4);
  generategames(launcher);
  generatelaunchers(launcher);
  document.getElementById('game-bg').style.backgroundImage = 'url(https://cool-launcher2.vercel.app/assets/images/builder.jpg)';
  document.getElementById('game-title').src = 'https://cool-launcher2.vercel.app/assets/images/builder-title.png';
  document.getElementById('gameedition').innerHTML = 'EAGLERFORGE BUILDER';
  document.getElementById('header2').style.display = 'none';
  document.getElementById('header3').style.display = 'none';
  document.getElementById('header5').style.display = 'none';
  document.getElementById('header6').style.display = 'none';
  document.getElementById('header7').style.display = 'none';
  document.getElementById('header8').style.display = 'none';
  document.getElementById('header9').style.display = 'none';
  document.getElementById('header10').style.display = 'none';
  document.getElementById('header11').style.display = 'none';
  document.getElementById('gtabs7').classList.add('selected');
}

function playheader() {
  resetHeaderSelected();
  generategames(launcher);

  document.getElementById('game-bg').style.display = "flex";
  document.getElementById('header1').classList.add('selected'); // ✅ select header1 manually

  // ✅ show info box only on Play page
  document.querySelector(".informationBox").style.display = "flex";
}

function modsheader(){
  resetHeaderSelected();
  generatemods();
  document.getElementById('mods').style.display = "flex";
  document.getElementById('header2').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function serversheader(){
  resetHeaderSelected();
  generateservers();
  document.getElementById('servers').style.display = "flex";
  document.getElementById('header11').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function skinsheader(){
  resetHeaderSelected();
  generateskins();
  document.getElementById('skins').style.display = "flex";
  document.getElementById('header5').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function faqsheader() {
  resetHeaderSelected();

  document.getElementById('faq').style.display = "block";
  document.getElementById('header3').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function installationheader(){
  resetHeaderSelected();
  document.getElementById('installations').style.display = "flex";
  document.getElementById('header4').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function patchnotesheader(){
  resetHeaderSelected();
  generatenotes();
  document.getElementById('patchNotes').style.display = "flex";
  document.getElementById('header6').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function generalheader(){
  resetHeaderSelected();
  document.getElementById('general').style.display = "flex";
  document.getElementById('header7').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function accountsheader(){
  resetHeaderSelected();
  document.getElementById('accounts').style.display = "flex";
  document.getElementById('header8').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function aboutheader(){
  resetHeaderSelected();
  document.getElementById('about').style.display = "flex";
  document.getElementById('header9').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}

function creditheader(){
  resetHeaderSelected();
  document.getElementById('credit').style.display = "flex";
  document.getElementById('header10').classList.add('selected');
  document.getElementById('gameSelection').style.display = 'none';
  

  // ✅ hide info box when not on Play
  document.querySelector(".informationBox").style.display = "none";
}
// Dropdown game options toggle
function dropdowntoggle(){
  if (dropdown.style.visibility === 'hidden') {
      dropdown.style.visibility = 'visible';
      document.getElementById('dropdownuparrow').innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 20 20"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="dropdownIcon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 15l6 -6l6 6" /></svg>';
  } else {
      dropdown.style.visibility = 'hidden'; 
      document.getElementById('dropdownuparrow').innerHTML = '<svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 20 20"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="dropdownIcon"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M6 9l6 6l6 -6" /></svg>';
  }
}

// Resets certain UI aspects
function resetTabSelected() {
  while (dropdown.firstChild) {dropdown.removeChild(dropdown.firstChild)};
  while (installations.firstChild) {installations.removeChild(installations.firstChild)};
  for (var i = 1; i <= 11; i++) {   // loop through ALL headers
      let gtabs = document.getElementById('gtabs' + [i]);
      let headers = document.getElementById('header' + [i]);
      if (gtabs) gtabs.classList.remove('selected');
      if (headers) headers.style.display = "block";
  };
  playheader();
}


function resetHeaderSelected() {
  // clear children
  while (dropdown.firstChild) { dropdown.removeChild(dropdown.firstChild) };
  while (mods.firstChild) { mods.removeChild(mods.firstChild) };
  while (notes.firstChild) { notes.removeChild(notes.firstChild) };

  // remove all selected classes
  for (let i = 1; i < 12; i++) {  // 1–11 covers all headers
      let headers = document.getElementById('header' + i);
      if (headers) headers.classList.remove('selected');
  };

  // hide all sections
  document.getElementById('game-bg').style.display = "none";
  document.getElementById('game-title').style.display = 'flex';
  document.getElementById('gameSelection').style.display = "flex";
  document.getElementById('mods').style.display = "none";
  document.getElementById('faq').style.display = "none";
  document.getElementById('installations').style.display = "none";
  document.getElementById('patchNotes').style.display = "none";
  document.getElementById('general').style.display = "none";
  document.getElementById('accounts').style.display = "none";
  document.getElementById('about').style.display = "none";
  document.getElementById('credit').style.display = "none";
  document.getElementById('servers').style.display = "none";
  document.getElementById('skins').style.display = "none";
}



// Prevents touchscreen move
window.addEventListener("scroll", preventMotion, false);
window.addEventListener("touchmove", preventMotion, false);

function preventMotion(event)
{
  window.scrollTo(0, 0);
  event.preventDefault();
  event.stopPropagation();
}



document.addEventListener("DOMContentLoaded", () => {
  const playButton = document.getElementById("playbutton");

  playButton.addEventListener("click", (e) => {
      // Always grab the latest keepLauncherOpen setting
      const keepOpen = localStorage.getItem("keepLauncherOpen") === "true";
      const gameUrl = playButton.getAttribute("href");

      if (keepOpen) {
          e.preventDefault(); // Stop normal navigation
          window.open(gameUrl, "_blank"); // Open in new tab
          console.log("Opened game in new tab (launcher kept open)");
      } else {
          console.log("Opened game in same tab (launcher closed)");
          // Default <a> behavior continues (same tab)
      }
  });
});




document.addEventListener("DOMContentLoaded", () => {
  const inputEl = document.getElementById('accountUsernameInput');
  const saveBtn = document.getElementById('saveUsernameBtn');
  const usernameEls = document.querySelectorAll('.username-text');

  function updateUsernameDisplay(name) {
      usernameEls.forEach(el => {
          el.innerText = name || "Generic User";
      });
  }

  // Load saved username
  const savedName = localStorage.getItem('username');
  if (savedName) updateUsernameDisplay(savedName);

  // Live preview while typing
  if (inputEl) {
      inputEl.addEventListener('input', () => {
          updateUsernameDisplay(inputEl.value);
      });
  }

  // Save button
  if (saveBtn && inputEl) {
      saveBtn.addEventListener('click', () => {
          const name = inputEl.value.trim();
          if (name) {
              localStorage.setItem('username', name);
              updateUsernameDisplay(name);
              inputEl.value = "";
              showSavedPopup("Username saved!");
          }
      });
  }

  // Popup function (separate from copy)
  function showSavedPopup(message) {
      const popup = document.createElement("div");
      popup.innerText = message;
      popup.style.position = "fixed";
      popup.style.top = "20px";
      popup.style.right = "20px";
      popup.style.backgroundColor = "#007bff";
      popup.style.color = "white";
      popup.style.padding = "10px 20px";
      popup.style.borderRadius = "5px";
      popup.style.fontWeight = "bold";
      popup.style.boxShadow = "0 2px 6px rgba(0,0,0,0.9)";
      popup.style.zIndex = "9999";
      popup.style.opacity = "1";
      popup.style.transition = "opacity 0.5s ease-out";

      document.body.appendChild(popup);

      setTimeout(() => {
          popup.style.opacity = "0";
          setTimeout(() => document.body.removeChild(popup), 500);
      }, 1000);
  }
});



function generateRandomID(length = 20) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let id = "";
  for (let i = 0; i < length; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function detectDevice() {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;

  // Check if Chromebook
  if (userAgent.includes("CrOS")) {
      return "Chromebook (Chrome OS)";
  }

  // Otherwise fallback
  return platform || "Unknown Device";
}

function loadAboutSection() {
  const aboutContent = document.getElementById("aboutContent");

  // Device info
  const device = detectDevice();

  // Date
  const date = new Date().toLocaleDateString();

  // Random ID (saved in localStorage so it stays the same across reloads)
  let randomID = localStorage.getItem("aboutRandomID");
  if (!randomID) {
      randomID = generateRandomID();
      localStorage.setItem("aboutRandomID", randomID);
  }

  // Fill in content
  aboutContent.innerHTML = `
      <p class="bolded patchnotes-title">Device Info</p>
      <div class="settingscontainer">
          <p>Device: ${device}</p>
          <p>User Agent: ${navigator.userAgent}</p>
          <p>Date: ${date}</p>
          <p>ID: ${randomID}</p>
      </div>
  `;
}

// Run when page loads
loadAboutSection();





// Load saved settings
          document.querySelectorAll('.settingBox').forEach(box => {
              const key = box.dataset.setting;
              if(localStorage.getItem(key) === "true") {
                  box.checked = true;
              } else if(localStorage.getItem(key) === "false") {
                  box.checked = false;
              }

              // Save on change
              box.addEventListener('change', () => {
                  localStorage.setItem(key, box.checked);
                  applySetting(key, box.checked);
              });
          });

          // Example function to apply setting changes dynamically
          function applySetting(key, value) {
              switch(key) {
                  case "keepLauncherOpen":
                      console.log("Keep Launcher Open:", value);
                      break;
                  case "animatePages":
                      console.log("Animate Pages:", value);
                      break;
                  case "animatePlayButton":
                      console.log("Animate Play Button:", value);
                      break;
                  case "bigText":
                      document.body.style.fontSize = value ? "1.2em" : "1em";
                      break;
                  case "disableVideoAutoplay":
                      console.log("Video Autoplay Disabled:", value);
                      break;
                  case "quickPlay":
                      console.log("Quick Play Enabled:", value);
                      break;
              }
          }

          // Apply all saved settings on load
          document.addEventListener("DOMContentLoaded", () => {
              document.querySelectorAll('.settingBox').forEach(box => {
                  applySetting(box.dataset.setting, box.checked);
              });
          });




// Username Generator
let username = document.getElementById('username');
let userchosen = false;
if (userchosen === false && !localStorage.getItem("username")) {
  fetch("https://genr8rs.com/api/Content/Fun/XboxNameGenerator?genr8rsUserId=1748114452.233968321c14391c2&_sGameGenre=any").then((response) => response.json()).then((data) => {
      if (!data) {return};
      username.innerHTML = data._sResult;
      localStorage.setItem("username", data._sResult);
      userchosen = true;
  })
}
else {username.innerHTML = localStorage.getItem("username")}

generateprofile(1);
generategames("https://cool-launcher2.vercel.app/assets/json/base.json");
generatefaqs();
generatelaunchers("https://cool-launcher2.vercel.app/assets/json/base.json");
console.clear();
