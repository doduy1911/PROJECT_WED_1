const tablePermission = document.querySelector("[table-permission]")
if(tablePermission){
    const buttonSubmit = document.querySelector("[button-submit]")
    buttonSubmit.addEventListener("click",() => {
        let result = []
        const rows = tablePermission.querySelectorAll("[data-name]")
        rows.forEach(row => {
            const name = row.getAttribute("data-name")
            const inpust = row.querySelectorAll("input")
            // console.log(inpust)

            if(name == "id"){
                inpust.forEach(input => {
                    // console.log(input.value)
                    const value = input.value
                    result.push({
                        id : value,
                        permission : []

                    })
                })

            } else {
                inpust.forEach((input,index) => {
                    const checked = input.checked
                    // console.log(name)

                    // console.log(checked)
                    // console.log(index)
                    // console.log("-------------")
                    if(checked){
                        result[index].permission.push(name)

                    } 
                })

            } 
            // console.log(name)
        })
        // console.log(result)
        // console.log(permission)
        // console.log(JSON.stringify(result))
        const formChangePermission = document.querySelector("#form-change-permission")
        const inputPermission = formChangePermission.querySelector("input")
        inputPermission.value = JSON.stringify(result)
        formChangePermission.submit();
        // console.log(inputPermission) 
        // console.log(formChangePermission)
        
    })
}
// end

// permessions  default
const dataRecords = document.querySelector("[data-records]")
console.log(dataRecords)
if(dataRecords){
    const records = JSON.parse(dataRecords.getAttribute("data-records"))
    console.log(records)
}
// end permessions  default