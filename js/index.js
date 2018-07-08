$('#csv_file_input').on('change',function(){
	alert("changed");
});

$('#csv_file_input').on('change', function (e) {
    var ext = $("#csv_file_input").val().split(".").pop().toLowerCase(); //csv
    if (e.target.files != undefined) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var csvval = e.target.result.split("\n");
            var jsonObj = [];
            var headers = csvval[0].split(",");
            for (var i = 1; i < csvval.length; i++) {
                var data = csvval[i].split(',');
                var obj = {};
                for (var j = 0; j < data.length; j++) {
                    obj[headers[j].trim()] = data[j].trim();
                }
                jsonObj.push(obj);
            }
            var jsonData = JSON.stringify(jsonObj);
            addDataToTable(jsonData);
        };
        reader.readAsText(e.target.files.item(0));
    }
    return false;
});

function addDataToTable(jsonObjArr){
    var json = JSON.parse(jsonObjArr);
    console.log(json);
    console.log(typeof json);
    var tbl = $("#data_preview");
    for(var i = 0; i < json.length-1; i++){
        var studentId = json[i]['Student Id'];
        var firstName = json[i]['First Name'];
        var lastName = json[i]['Last Name'];
        var middle = json[i]['Middle Initial'];
        tbl.append(
            "<tr><td>" + studentId + "</td>" +
            "<td>" + firstName + "</td>" +
            "<td>" + lastName + "</td>" +
            "<td>" + middle + "</td>" +
            "</tr>"
        );
    }
}