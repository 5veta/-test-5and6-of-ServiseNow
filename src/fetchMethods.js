export const fetchFilterData=async(url)=>{

	let options={
		method: 'GET',
		headers: {
			'Host': 'https://dev72521.service-now.com/',
			'Accept':'application/json',
			'Content-Type': 'application/json',
		}
	};
	
	try {
		const result = await fetch(url, options);
		const data=await result.json();
		
		return data.result;
	  } catch(e) {
		console.log(e.error);
	}
};

