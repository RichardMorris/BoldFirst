// Alter a whole paragraph,
// splits the pararaph into words and bolds the first letter of each word.
// Only processes the text nodes other elements are ignored.
// current implementation is rather dumb on what it considers a word
function alterParagraph(parg) {
		if (parg.hasChildNodes()) {
			let children = parg.childNodes;
			let temp = document.createElement('template');
			
			let newNode = [];
  			for (let j = 0; j < children.length; j++) {
  				let node = children[j];		
  				if(node.nodeType == Node.TEXT_NODE) {
  					let words = node.nodeValue.split(/\s+/);
  					words.forEach(word => {
  						switch(word.length) {
  						case 0: break;
  						case 1: {
  								var b = document.createElement('b');
  								b.innerText = word;
  								temp.appendChild(b);
  								temp.append(' ');
  								break;
  							}
						default: {
							let head = word.substr(0,1);
							let tail = word.substr(1);
  							var b = document.createElement('b');
  							b.innerText = head;
  							temp.appendChild(b);
						    temp.append(tail+" ");
						}  						
  						
  						}; // end switch
  					}); // end forEach


  				} else {
  					temp.appendChild(node);
  				}
			}
			parg.replaceChildren(...temp.childNodes);
		}
}

// Alter all elements in a collection
function alterCollection(pgraphs) {
	for(var i=0;i<pgraphs.length;++i) {
		let parg = pgraphs[i];
		alterParagraph(parg);
	}
	var items = document.getElementsByTagName('li');
}

function incCount(obj,key) {
	if(key in obj) {
		obj[key] = obj[key] +1;
	} else {
		obj[key] = 1;
	}
}

// Alter all text in the page
const alterPage = () => {
	var allowedTags = ['P','A','LI','TD','I','EM','DL','DT','FIGCAPTION'];


    var walker = document.createTreeWalker(
        document.body, 
        NodeFilter.SHOW_TEXT
    );

    var parentNodes = [];
    var excluded = {};
    let node;
    while(node = walker.nextNode()) {
    	let parent = node.parentNode; 
    	if(!('fixated' in parent)) {
			parent.fixated=true;
    		if(allowedTags.includes(parent.nodeName)) {
    			parentNodes.push(parent);
	    	} else {
    			incCount(excluded,parent.nodeName);
    		}
    	} 
    }
	alterCollection(parentNodes);
	console.log("Excluded tags ",excluded);
}
