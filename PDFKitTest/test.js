const PDFDocument = require('pdfkit');
const fs = require('fs');

px_width = 2303; // width of page in pixels
mm_width = 195; // width of page in mm

one_mm_width = px_width/mm_width; // width of one mm in pixels

one_inch_width_points = 72 // width of one inch in pdf pointspoints in pdf size
one_inch_width_mm = 25.4 // width of one inch in mm

one_mm_width_points = one_inch_width_points/one_inch_width_mm; // width of one mm in points

one_px_width_points = one_mm_width_points/one_mm_width; // width of one pixel in points - multiply this by pixel positions to use in coordinate system

console.log(one_px_width_points);


// Create a document
const doc = new PDFDocument({size: [552.75624, 683.14968]});
doc.font('fonts/sweetpea.ttf')

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));
//front page:

//inside page:

//page 1:

//page 2:

//page 3:
doc.addPage()
var text = "Twas the night before Christmas\nAnd snug in their house\nThe little mice gathered\nAround Mummy Mouse.";
doc.image('images/book1/CM - 02.png', 900*one_px_width_points, 1406*one_px_width_points, {height: 150}); // width is automatically scaled to height
doc.text(text, 800*one_px_width_points, 800*one_px_width_points) // TODO: instead of manually doing the newlines, try to sort the text wrapping 

// Finalize PDF file
doc.end();
