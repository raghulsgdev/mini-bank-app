document.addEventListener("DOMContentLoaded", function () {

    const form = document.querySelector("form");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("nameInpt").value.trim();
        const number = document.getElementById("noInpt").value.trim();
        const dob = document.getElementById("dobInpt").value;
        const address = document.getElementById("addInpt").value.trim();
        const mail = document.getElementById("mailInpt").value.trim();
        const amt = document.getElementById("amtInpt").value.trim();

        if (!name || !number || !dob || !address || !mail || !amt) {
            alert("Please fill all fields!");
            return;
        }

        if (number.length !== 10 || isNaN(number)) {
            alert("Enter a valid 10-digit mobile number!");
            return;
        }

        if (!mail.includes("@") || !mail.includes(".")) {
            alert("Enter a valid email address!");
            return;
        }

        if (isNaN(amt) || Number(amt) <= 0) {
            alert("Enter a valid initial amount!");
            return;
        }

        let users = JSON.parse(localStorage.getItem("users")) || [];

        const exists = users.some(user => user.Number === number);
        if (exists) {
            alert("Account already exists with this mobile number!");
            return;
        }

        const accNo = "MB" + Math.floor(100000 + Math.random() * 900000);
        const ifsc = "MBNK" + Math.floor(1000 + Math.random() * 9000);

        const newUser = {
            Name: name,
            Number: number,
            Dob: dob,
            Address: address,
            Email: mail,
            Account_No: accNo,
            IFSC_Code: ifsc,
            Initial_Amount: Number(amt)
        };

        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert(
            `Account Created Successfully!\nAccount No: ${accNo}\nIFSC Code: ${ifsc}`
        );

        form.reset();
    });

});