// add state functionality - useState
import { useState} from 'react';
import './Form.css';

function Form() {
    const [form, setForm] = useState({
        pregnancies: "",
        glucose: "",
        blood_pressure: "",
        skin_thickness: "",
        insulin_level: "",
        bmi: "",
        diabetes_pedigree: "",
        age: ""
    });

    //Lock the submit form button after the user clicks on it submitting the values he/she enter in the form;
    //This change will keep the user in the loop and giving feedback that his/her action was successful
    //and the app is processing the result
    const [loading, setLoading] = useState(false);

    const [result, setResult] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const form_data = new FormData();

        form_data.append("1", form.pregnancies);
        form_data.append("2", form.glucose);
        form_data.append("3", form.blood_pressure);
        form_data.append("4", form.skin_thickness);
        form_data.append("5", form.insulin_level);
        form_data.append("6", form.bmi);
        form_data.append("7", form.diabetes_pedigree);
        form_data.append("8", form.age);

        setLoading(true);

        fetch('https://test-ds-model-deployment-2.herokuapp.com/predict', {
            method: 'POST',
            body: form_data
        })
            // receive the data then convert it to JSON format
            .then(response => response.text())
            .then(html => {
                setResult(html);
                setLoading(false);
            })
    };

    const onChange = () => {
        const name = event.target.name;
        const value = event.target.value;
        setForm({ ...form, [name]: value});
    };

    // Functionality that gives an option to clear the form back to its original state
    const handleClear = () => {
        setForm({
            pregnancies: "",
            glucose: "",
            blood_pressure: "",
            skin_thickness: "",
            insulin_level: "",
            bmi: "",
            diabetes_pedigree: "",
            age: ""
        });
    
        setResult("");
    
    };

    return(
        <form onSubmit={handleSubmit}>
            <h4>Diabetes Prediction Model</h4>
            <p>Example to Predict Probability of Diabetes</p>
            <input type="number" name="pregnancies" value={form.pregnancies} onChange={onChange} placeholder="Number of Pregnancies" required />
            <input type="number" name="glucose" value={form.glucose} onChange={onChange} placeholder="Glucose level in Sugar" required />
            <input type="number" name="blood_pressure" value={form.blood_pressure} onChange={onChange} placeholder="Blood Pressure" required />
            <input type="number" name="skin_thickness" value={form.skin_thickness} onChange={onChange} placeholder="Skin Thickness" required />
            <input type="number" name="insulin_level" value={form.insulin_level} onChange={onChange} placeholder="Insulin Level" required />
            <input type="number" name="bmi" value={form.bmi} onChange={onChange} placeholder="Body Mass Index (BMI)" required />
            <input type="number" name="diabetes_pedigree" value={form.diabetes_pedigree} onChange={onChange} placeholder="Diabetes Pedigree Function" required />
            <input type="number" name="age" value={form.age} onChange={onChange} placeholder="Age" required />
            <button type="submit" disabled={loading}>{loading ? "Predicting Result..." : "Submit Form"}</button>
            {result && <span onClick={handleClear}>Clear Prediction</span>}

            {result && <div dangerouslySetInnerHTML={{__html: result}} className="result"/>}
        </form>
    );
}

export default Form;