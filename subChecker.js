const http = require("http")
const https = require("https")
const readLine = require("readline")
const fs = require("fs")
const path = require("path")
const colors = require("colors")



const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})


function logo() {
    console.log(colors.yellow( `  
MMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMMMMMWXKOkkxxddxxkO0KNWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMMMWX0xoc:::::::::::::cldk0NWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMMMN0xl:::::::::::::::::::::cokKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMMMW0dc:::::::::::::::::::::cccc:cxKWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MMWXxc::::::::::::::::::::::clllllc:lkNMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM
MWKo::::::::::::::::::::::cclllllllc::d0KKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKKXNWMM
MKo::::::::::::::::::::::cllllllllllc::cloddddddddddddddddddddddddddddddddddOXWM
Xd::::::::::::::::::::::cllllllllllllc:::::::::::::::::::::::::::::::xO000000KNM
Occdxxxxxxxxxxxxdxxxxxxxkkkkkkkkkkkkkkdc:::: SUB CHECKER :::::::::::.kKNNNNNXKNM
x:xNWWWMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMXo;::::::::::::::::::::::::::::XKXXXXXKKNM
d:kWMWNWWWWWWWWWWMWWWWNNWWWWWWMWWWWMMMNd::xXWWWWWWWWWWWWWWWWWWNNNWWNNXKXXXXXXKNM
d:kWWNXXXNNWNNXXNWNNNXXXXXXXXWWNXXNMMMXd::xXWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
kcoXMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMMM0l;cONWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
KockNWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWXd::dKWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
W0llONNNNNNNNNNNWWNNWWWNWNWWWWWWWWWWXxclx0NWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MWOllkXNNNNNNNWWWWWWWWWWWWWWWWWWWWNXxclOXNWWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMW0ocd0NNNNNWWNWWWWWWWWWNWWNNNWWNOoco0NWWWWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMMMXklld0XNWWWWWWWWWWWWWNWNWWNXOdc:ckKNWWWWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMMMMWXkolox0XNNWWWWWWWWWNNXKOxllll::coOKXNWWWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMMMMMMMNKkolloxkOO000OOkxdolldkKXKkl::cloOXNWWWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMMMMMMMMMMWX0OxdoooooooddxO0XNWWWWWKkl:::coOXNWWWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
MMMMMMMMMMMMMMWWWNNNNNNNWWWWWWWWWWWWWWKkdl::coOXNWWWWWWWWWWWWWNNNNNNNXKXXXXXKKNM
::: Creted By S4MSecurity :::::::::WWWWWNKkl::coOKNWWWWWWWWWWWNNNNWNNXKXXXXXKKNM
MMMMMMMMMMMMMMWWWWWWWWWWWWWWWWWWWWWWWWWWWWWKkl::cdKNWWWWWWWWWWNNNWWNNXKKXXXKKXWM
    `))

}

function statusControl(status, control) {
    if (status == 1) {
        console.log(colors.green("[+] "+control))
    }
    if(status == 0){
        console.log(colors.red("[-] "+control))
    }
}

function checkAddress(ssl, url) {
    if (ssl == "http") {
        http.get(url, function (res) {
            if (res) {
                statusControl(1, url)
            }
        }).on("error", function (e) {
            statusControl(0, url)
        })
    }
    else if (ssl == "https") {
        https.get(url, function (res) {
            if (res) {
                statusControl(1, url)
            }
        }).on("error", function (e) {
            statusControl(0, url)
        })
    }
}


function fileReading(ssl, filePath, webAddress) {
    fs.readFile(filePath, "utf-8", function (err, data) {
        if (err) {
            console.log("Error [fileReading]: " + err)
            fs.close()
        }
        else {
            var fileArray = data.split("\n")
            for (i = 0; i < fileArray.length; i++) {
                checkAddress(ssl, ssl + "://" + fileArray[i].replace("\r", "") + "." + webAddress)
                if (i + 1 == fileArray.length) {
                    rl.close()
                }
            }

        }
    })
}



function webAdress(ssl, filePath) {
    rl.question("\n|| Enter web address [Example: example.com]: ", function (webAddress) {
        fileReading(ssl, filePath, webAddress)
    })
}


function fileInput(ssl) {

    rl.question("\n|| Please, input file path for subdomain name lists\n|| Default path '" + path.join(__dirname, "sublist.txt") + "' : ", function (filePath) {

        if (filePath.length > 3 && filePath.trim() != "") {
            webAdress(ssl, filePath)
        }
        else {
            webAdress(ssl, path.join(__dirname, "sublist.txt"))
        }

    })

}



function startProgram() {
    logo()
    rl.question("|| How to heyper text transfer protocol: Http or Https?\n|| Enter to Http = 0 / Https = 1 : ", function (sslAsk) {

        if (sslAsk == 1 || sslAsk.toLowerCase() == "https") {
            fileInput('https')
        }
        else if (sslAsk == 0 || sslAsk.toLowerCase() == "http") {
            fileInput('http')
        }
        else {
            startProgram()
        }
    })

}

startProgram()
