const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// def  l'étudiant
const StudentSchema = new Schema({
    name: { 
        type: String, 
        required: true 
    },
    classroom_id: { 
        type: Schema.Types.ObjectId, 
        ref: 'Classroom', 
        required: true 
    }
}, { timestamps: true }); 


module.exports = mongoose.model('Student', StudentSchema);
