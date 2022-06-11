import './Dropdown.css';
import Select from "react-select";

function Dropdown(props){
    return(
        <div class="row">
            <div class="col-lg-6 mx-auto">
                <label class="text-white mb-3 lead">Where do you live?</label>
                <Select
                    // styles={styles}
                    closeMenuOnSelect={false}
                    isMulti
                    options={[
                        { value: "React", label: "React" },
                        { value: "React Native", label: "React Native" },
                        { value: "Vue", label: "Vue" },
                        { value: "Angular", label: "Angular" },
                        { value: "RxJS", label: "RxJS" },
                        { value: "jQuery", label: "jQuery" }
                      ]}
                    defaultValue={{ value: "React", label: "React" }}
                />
            </div>
        </div>
    )
}

export default Dropdown;