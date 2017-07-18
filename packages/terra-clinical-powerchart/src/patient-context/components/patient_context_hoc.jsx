import { connect } from 'react-redux';
// import patientContextReducers from './reducers';

// Create connected HOC

export default () => {
  const mapStateToProps = state => (
    (patientContextState => ({
      patientContextData: patientContextState,
    }))(state.patientContext)
  );

  const items = [];
  this.props.options.map((listItem) => {
    const showRemove = (listItem.isActive ? '' : 'none');
    items.push(
      <MultiSelectList.Item
        className='admin-data'
        onMouseOver={this.onMouseOver.bind(this, listItem.key)}
        onMouseOut={this.onMouseOut.bind(this, listItem.key)}
        content={(
          <div>
            <ListViewItem text={listItem.text} />
            <Button onClick={this.onRemoveOption.bind(this, listItem.key)} style={{display:showRemove}} className="remove-data" icon={iconClear} variant="link" />
          </div>
        )} />
      );
  }, this);


  // const mapDispatchToProps = dispatch => ({
  //   changePatientContext: (data) => { dispatch(changePatient(data)); },
  // });

  return Component => (
    connect(mapStateToProps)(Component)
  );
};

// Export necessary reducers

const reducers = {
  // patientContext: patientContextReducers,
};
export { reducers };

