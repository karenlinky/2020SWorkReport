const SideMenuOverlay = document.getElementById("menuOverlay");
const SideMenu = document.getElementById("sideMenuContainer");
function showHideSideMenu() {
	SideMenuOverlay.classList.toggle("sideMenuShow");
	SideMenu.classList.toggle("sideMenuShow");
}
