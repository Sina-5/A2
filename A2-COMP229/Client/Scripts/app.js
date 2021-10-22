/* fileName: app.js
 Student Name:Sina Pazhwak
 Student ID:301033560
 Date:2021-10-0-22 */

//  to confirm delete contacts list
"use strict";
(function () {
  function confirmDelete() {
    $("a.delete").on("click", function (event) {
      if (!confirm("Are you sure?")) {
        event.preventDefault();
        location.href = "/contacting-list";
      }
    });
  }
  function Start() {
    console.log("App Started");
    confirmDelete();
  }
  window.addEventListener("load", Start);
})();
