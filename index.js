function myfunction(){
    var m =parseFloat(document.getElementById("mass").value);
    var k =parseFloat(document.getElementById("k").value);
    var c =parseFloat(document.getElementById("dc").value);
    m_unit=document.getElementById("m_unit").value;
    k_unit=document.getElementById("k_unit").value;
    vib=document.getElementById("vib").value;
    //converting to SI unit 
    if (m_unit!="kg"){
        if (m_unit=="g"){
            m=m/1000;
        }
        else{
            m=m*0.453592;
        }
         
    }
    if(k_unit!="N/m"){
        if (k_unit=="N/mm"){
            k=k*1000;
        }
        else{
            k=k*175.1268369864;
        }
    }
    var wn=(k/m)**0.5;
    var fn=wn/(2*3.14);
    var tn=1/fn;
    var Cc= 2*m*wn;
    var Crit_Damp= c*Cc;
    var wd= wn*(1-c**2)**0.5;
    var fd=wd/(2*3.14);
    var Q=1/(2*c);
    var myTable = document.getElementById('table2');
    myTable.rows[2].cells[1].innerHTML = wn.toFixed(2);
    myTable.rows[3].cells[1].innerHTML = fn.toFixed(2);
    myTable.rows[4].cells[1].innerHTML = tn.toFixed(2);
    myTable.rows[5].cells[1].innerHTML =Cc.toFixed(2);
    myTable.rows[6].cells[1].innerHTML = Crit_Damp.toFixed(2);
    myTable.rows[7].cells[1].innerHTML = wd.toFixed(2);
    myTable.rows[8].cells[1].innerHTML = fd.toFixed(2);
    myTable.rows[9].cells[1].innerHTML = Q.toFixed(2);
    console.log(myTable.rows[4].cells[1].innerHTML);

    if (vib=="forced"){
        var Omega=parseFloat(document.getElementById("Omega").value);
        var num =1 +(2*c*Omega/fn)**2
        var denom=(1- (Omega/fn)**2)**2 +(2*c*Omega/fn)**2
        myTable.rows[10].cells[1].innerHTML = ((num/denom)**0.5).toFixed(2);
        
        var x_input=[0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9, 1, 2, 3, 4, 5, 6, 7, 8,9,10]
        var y_output=[]

        for (let i = 0; i < x_input.length; i++) { 
            var n =1 +(2*c*x_input[i])**2
            var d=(1- (x_input[i])**2)**2 +(2*c*x_input[i])**2
            y_output.push((n/d)**0.5)
        }
        var trace1 = {
            x: x_input,
            y: y_output,
            type: 'scatter'
        };
        

        var data = [trace1];
        
        var layout = {
            xaxis: {
            title:"Frequency Ratio [Ω/fn]",
            type: 'log',
            autorange: true
            },
            yaxis: {
            title:"Transmissibility [TR]",
            type: 'log',
            autorange: true
            }
        };
        
        Plotly.newPlot('myDiv', data, layout);
                
            }



};

