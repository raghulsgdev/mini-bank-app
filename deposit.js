function handleDeposit(event) {
    event.preventDefault();

    const name = document.getElementById("dep_accHolder").value.trim();
    const mobile = document.getElementById("dep_num").value.trim();
    const accNo = document.getElementById("dep_accNumber").value.trim();
    const depositAmt = document.getElementById("dep_amt").value.trim();

    if (!name || !mobile || !accNo || !depositAmt) {
        alert("Please fill all fields!");
        return;
    }

    if (mobile.length !== 10 || isNaN(mobile)) {
        alert("Enter a valid 10-digit mobile number!");
        return;
    }

    if (isNaN(depositAmt) || Number(depositAmt) <= 0) {
        alert("Enter a valid deposit amount!");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users"));

    if (!users || users.length === 0) {
        alert("No account found!");
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
            users[i].Initial_Amount =
                Number(users[i].Initial_Amount) + Number(depositAmt);

            alert(
                `Amount Deposited Successfully!\nDeposited: ₹${depositAmt}\nCurrent Balance: ₹${users[i].Initial_Amount}`
            );
            break;
        }
    }

    if (!userFound) {
        alert("Invalid Account Details!");
        return;
    }

    localStorage.setItem("users", JSON.stringify(users));
    event.target.reset();
}

document.querySelector("form").addEventListener("submit", handleDeposit);

