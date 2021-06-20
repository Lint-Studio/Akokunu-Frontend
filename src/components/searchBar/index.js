import Select from 'react-select'

export default function  SearchBar(props){

    return(
        // eslint-disable-next-line react/jsx-no-undef
        <Select
            className="basic-single"
            classNamePrefix="select"
            defaultValue={props.data[0]}
            isSearchable={true}
            isDisabled={false}
            isClearable={true}
            value={props.value}
            options={props.data}
        />
    )

}