var cors = require('cors')
const express = require('express');
const app = express();
app.use(cors())
const fs = require('fs')


app.get('/', (req, res) => {
    res.send("This is our server")
  })

const port = 8000

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

app.post('/', (req, res) => {
    machineDataFile = './machineData.txt'
    patientAndSampleDataFile = './patientAndSampleData.txt'

    current_patientData =[]
    final_data=[];

    //Read from data file
    fs.readFile(machineDataFile, 'utf8' , (err, data) => {
        if (err) {
          console.error(err)
          return
        }
        current_machine_data= data.split('\n');
        l=current_machine_data.length;
        final_data=[]
        
        //now, get the patients to match the data
        fs.readFile(patientAndSampleDataFile, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }
            dataList = data.split('\n')
            current_patientData=dataList.slice(0,l)

            //combine lists
            if (current_patientData.length > 0){
                for (let i = 0; i < l; i++) {
                    p=current_patientData[i].split('   ')
                    final_data.push({
                        "patient": p[0],
                        "sample": p[1],
                        "machine": current_machine_data[i],
                    });
                }
                //console.log("final, ", final_data)
                console.log("final", final_data)
                res.send(final_data)
            }
            //res.send(final_data)

        })
        
        //res.send([{ patient: 'Patient O', sample: 'Sample983', machine: 'hi1' }])
        
    });
});