import {
  CircularProgress,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { MdDelete } from "react-icons/md";

export default function PromoCodeRow({ data, setData, addNewRow, removeRow }) {
  return (
    <div className="d-flex mb-4 w-100">
      <div className="col-md-4 pr-4">
        <TextField
          label="Promo Code"
          variant="outlined"
          fullWidth
          value={data.code || ""}
          onChange={(ele) =>
            setData({
              ...data,
              code: String(ele.target.value).toUpperCase(),
            })
          }
        />
      </div>
      <div className="col-md-4 pr-4">
        <TextField
          label="Value"
          variant="outlined"
          fullWidth
          value={data.value}
          type="number"
          inputProps={{}}
          onChange={(ele) =>
            setData({
              ...data,
              value: ele.target.value,
            })
          }
        />
      </div>
      <div className="col-md-3">
        <FormControl fullWidth>
          <InputLabel id="promo-code-branch">Type</InputLabel>
          <Select
            labelId="promo-code-branch"
            value={data.isPercentage ? 20 : 10}
            label="Type"
            // onChange={handleChange}
            onChange={(ele) =>
              setData({
                ...data,
                isPercentage: ele.target.value === 20,
              })
            }
          >
            <MenuItem value={10}>Amount</MenuItem>
            <MenuItem value={20}>Percentage</MenuItem>
          </Select>
        </FormControl>
      </div>
      {/* <div className="col-md-1 d-flex">
          <IconButton color="primary" component="span" className="m-auto" onClick={addNewRow}>
            <MdAddCircleOutline />
          </IconButton>
        </div> */}
      {data.loading ? (
        <CircularProgress className="m-auto" color="success" />
      ) : (
        <div className="col-md-1 d-flex">
          <IconButton
            color="primary"
            component="span"
            className="m-auto"
            onClick={removeRow}
          >
            <MdDelete />
          </IconButton>
        </div>
      )}
    </div>
  );
}
