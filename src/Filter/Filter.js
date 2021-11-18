import PropTypes from "prop-types";
import styles from "./Filter.module.css"

const Filter = ({filter, handleFilter}) => {
    return (
        <div className={styles.filter_box}>
             <label className={styles.filter_label}>
        Find contacts by name
        <input
          onChange={handleFilter}
          value={filter}
          className={styles.input_filter}
          type="text"
        />
      </label>
        </div>
       
    )
}

Filter.propTypes = {
    filter: PropTypes.string,
    handleFilter: PropTypes.func.isRequired
}

export default Filter