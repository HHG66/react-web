const components = {
  input: (props) => (<Input placeholder="Basic usage" />),
  select: (props) => (<Select
    defaultValue="lucy"
    options={props.options}
  />)

}