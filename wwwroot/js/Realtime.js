"use strict";

let connection;
let roomId = "";
let myRole = "";

function initRealtime(hubUrl) {

    connection = new signalR.HubConnectionBuilder()
        .withUrl(hubUrl)
        .build();

    connection.on("ReceiveMove", (...moveData) => {
        if (window.handleReceiveMove)
            window.handleReceiveMove(...moveData);
    });

    //  Đăng ký event ở đây
    connection.on("SetRole", (role) => {
        myRole = role;
        document.getElementById("status").innerText = "You are: " + role;
    });

    connection.start()
        .then(() => console.log("SignalR Connected"))
        .catch(err => console.error(err));
}

function createRoom() {
    roomId = document.getElementById("roomInput").value.trim();
    if (!roomId) return alert("Enter room code");
    connection.invoke("CreateRoom", roomId);
}

function joinRoom() {
    roomId = document.getElementById("roomInput").value.trim();
    if (!roomId) return alert("Enter room code");
    connection.invoke("JoinRoom", roomId);
}

function sendMove(...moveData) {
    connection.invoke("SendMove", roomId, ...moveData)
        .catch(err => console.error("SendMove error:", err));
}