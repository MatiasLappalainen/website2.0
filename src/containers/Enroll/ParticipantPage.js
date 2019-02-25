import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Columns, Column, Subtitle } from 'bloomer'
import { findEventEnrollsByEventId } from '../../selectors/eventEnrollSelectors'
import DataGrid from '../../components/DataGrid'
import { eventEnrollActions } from '../../actions'

const defaultColumnProperties = {
  width: 150,
  sortable: true,
  resizable: true
}
const mapFieldsToColumns = enroll => [
  { key: 'id', name: 'ID' },
  ...Object.keys(enroll.values).map(key => ({
    key, name: key, sortable: true, filterable: true
  })),
  { key: 'isSpare', name: 'Varasijalla' }
].map(c => ({ ...c, ...defaultColumnProperties }))

const mapEnrollValues = enroll => ({
  id: enroll.id,
  ...enroll.values,
  isSpare: enroll.isSpare ? 'X' : ''
})

export class ParticipantPage extends PureComponent {
  componentDidMount = () => {
    this.props.fetchEnrolls(this.props.eventId)
  }

  render() {
    const { enrolls } = this.props
    return (
      <Columns>
        <Column>
          <Subtitle isSize={5}>Osallistujat</Subtitle>
          {enrolls.length
            ? <DataGrid
              columns={mapFieldsToColumns(enrolls[0])}
              initialRows={enrolls.map(mapEnrollValues)}
              minHeight={600}
            />
            : (
              <p className='has-text-grey mb-1'>
                Ei osallistujia
              </p>
            )
          }
        </Column>
      </Columns>
    )
  }
  static propTypes = {
    eventId: PropTypes.number.isRequired,
    fetchEnrolls: PropTypes.func.isRequired,
    enrolls: PropTypes.array.isRequired
  }
}

const mapStateToProps = (state, ownProps) => ({
  enrolls: findEventEnrollsByEventId(state, ownProps.eventId) || []

})

const mapDispatchToProps = dispatch => ({
  fetchEnrolls: eventId => dispatch(eventEnrollActions.fetchEventEnrolls(eventId))
})

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantPage)