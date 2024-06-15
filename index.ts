import axios from 'axios';
import qs from 'qs';
import cheerio from 'cheerio';

async function solve(rollnumber : string){

let data = qs.stringify({
  '__LASTFOCUS': '',
  '__EVENTTARGET': 'btnSearch',
  '__EVENTARGUMENT': '',
  '__VIEWSTATE': '/wEPDwULLTIxMzYyODcwNTcPFgIeDFByZXZpb3VzUGFnZQVCaHR0cHM6Ly9jaGFydXNhdC5lZHUuaW46OTEyL1VuaWV4YW1yZXN1bHQvZnJtVW5pdmVyc2l0eVJlc3VsdC5hc3B4FgICAw9kFgICAQ9kFgRmD2QWDAIFDxAPFgYeDURhdGFUZXh0RmllbGQFBUFsaWFzHg5EYXRhVmFsdWVGaWVsZAULSW5zdGl0dXRlSUQeC18hRGF0YUJvdW5kZ2QQFQoJU2VsZWN0Li4uBUNTUElUBkNNUElDQQRSUENQBElJSU0GUERQSUFTBEFSSVAETVRJTgRDSVBTB0RFUFNUQVIVCgEwATEBMgEzATQBNQE2AjE2AjE5AjIxFCsDCmdnZ2dnZ2dnZ2cWAQIJZAIHDxAPFgYfAQUKRGVncmVlQ29kZR8CBQhEZWdyZWVJRB8DZ2QQFQgJU2VsZWN0Li4uCUJURUNIKENFKQ1CVEVDSChDRSktTkVQCUJURUNIKENTKQ1CVEVDSChDUyktTkVQCUJURUNIKElUKQ1CVEVDSChJVCktTkVQBERSQ0UVCAEwAzEzMgMxOTkDMTM0AzIwMQMxMzMDMjAwAzE1MhQrAwhnZ2dnZ2dnZxYBAgVkAgkPEA8WBh8BBQNTZW0fAgUDU2VtHwNnZBAVCQlTZWxlY3QuLi4BMQEyATMBNAE1ATYBNwE4FQkBMAExATIBMwE0ATUBNgE3ATgUKwMJZ2dnZ2dnZ2dnFgECBmQCCw8QDxYGHwEFDUV4YW1Nb250aFllYXIfAgUOU2NoZWR1bGVFeGFtSUQfA2dkEBUICVNlbGVjdC4uLgpBUFJJTCAyMDI0CkFQUklMIDIwMjMJSlVORSAyMDIyCE1BWSAyMDIyCE1BWSAyMDIxCUpVTFkgMjAyMApBUFJJTCAyMDIwFQgBMAQ2NzgzBDYxOTEENTc3NAQ1NjQ5BDUxNjEENDgzNwQ0NzYzFCsDCGdnZ2dnZ2dnZGQCDw8PZBYCHgdvbmNsaWNrBVAgdGhpcy52YWx1ZT0iUHJvY2Vzc2luZy4uIiA7dGhpcy5kaXNhYmxlZCA9IHRydWU7IF9fZG9Qb3N0QmFjaygnYnRuU2VhcmNoJywnJykgO2QCEQ8PFgIeBFRleHRlZGQCAQ9kFgICAQ9kFgICEw88KwANAGQYAgUIbXZSZXN1bHQPD2RmZAURdWNsR3JkMSRncmRSZXN1bHQPZ2SobvFVTh8D4tSrs36dSE6J6mgjNA==',
  '__VIEWSTATEGENERATOR': 'B051A224',
  'ddlInst': '21',
  'ddlDegree': '133',
  'ddlSem': '6',
  'ddlScheduleExam': '6783',
  'txtEnrNo': rollnumber 
});

let config = {
  method: 'post',
  maxBodyLength: Infinity,
  url: 'https://charusat.edu.in:912/Uniexamresult/frmUniversityResult.aspx',
  headers: { 
    'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7', 
    'accept-language': 'en-GB,en-US;q=0.9,en;q=0.8', 
    'cache-control': 'max-age=0', 
    'content-type': 'application/x-www-form-urlencoded', 
    'origin': 'https://charusat.edu.in:912', 
    'priority': 'u=0, i', 
    'referer': 'https://charusat.edu.in:912/Uniexamresult/frmUniversityResult.aspx', 
    'sec-ch-ua': '"Google Chrome";v="125", "Chromium";v="125", "Not.A/Brand";v="24"', 
    'sec-ch-ua-mobile': '?0', 
    'sec-ch-ua-platform': '"macOS"', 
    'sec-fetch-dest': 'document', 
    'sec-fetch-mode': 'navigate', 
    'sec-fetch-site': 'same-origin', 
    'sec-fetch-user': '?1', 
    'upgrade-insecure-requests': '1', 
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36'
  },
  data : data
};


const response  = await axios.request(config);
const parsedData= parseHtml(JSON.stringify(response.data));
   if(parsedData){
    console.log(parsedData.marks);
  console.log(parsedData.candidateName);
    console.log(parsedData.applicationNumber);

   }


}

function parseHtml(htmlContent: string){
    const $ = cheerio.load(htmlContent);

    const applicationNumber = $('td:contains("ID. No.")').next('td').next('td').text().trim() || 'N/A'

    const candidateName = $('td:contains("Name")').next('td').next('td').text().trim() || 'N/A';
            const marks = $('td:contains("21.00")').next('td').text().trim() || 'N/A';
            
            if(marks === 'N/A'){
          console.log(`Application Number: ${applicationNumber}`);
                return null;
            }
            return {
                applicationNumber,
                candidateName,
    
                
                marks

            }
}

async function main() {
    const promises = [];
    for (let i = 1; i <= 99; i++) {
      let rollnumber = `21dit${i.toString().padStart(3, '0')}`;
      promises.push(solve(rollnumber));
    }
    await Promise.all(promises);
  }
  
  main();












