function handleDebit(event) {
    event.preventDefault();

    const name = document.getElementById("deb_name").value.trim();
    const mobile = document.getElementById("deb_no").value.trim();
    const accNo = document.getElementById("deb_accno").value.trim();
    const debitAmt = document.getElementById("deb_amt").value.trim();

    if (!name || !mobile || !accNo || !debitAmt) {
        alert("Please fill all fields!");
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter a valid 10-digit mobile number!");
        return;
    }

    if (isNaN(debitAmt) || Number(debitAmt) <= 0) {
        alert("Enter a valid withdrawal amount!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
        alert("No accounts found! Please register first.");
        return;
    }

    let userFound = false;

    for (let i = 0; i < users.length; i++) {
        if (
            users[i].Name === name &&
            users[i].Number === mobile &&
            users[i].Account_No === accNo
        ) {
            userFound = true;

            if (users[i].Initial_Amount < Number(debitAmt)) {
                alert("Insufficient balance!");
                return;
            }

            users[i].Initial_Amount =
                Number(users[i].Initial_Amount) - Number(debitAmt);

            alert(
                `Amount Withdrawn Successfully!\nWithdrawn: ₹${debitAmt}\nCurrent Balance: ₹${users[i].Initial_Amount}`
            );
            break;
        }
    }

    if (!userFound) {
        alert("Invalid account details!");
        return;
    }

    localStorage.setItem("users", JSON.stringify(users));
    event.target.reset();
}

document.querySelector("form").addEventListener("submit", handleDebit);