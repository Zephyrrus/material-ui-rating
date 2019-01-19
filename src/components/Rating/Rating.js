import React, { Component } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@material-ui/core/IconButton'
import orange from '@material-ui/core/colors/orange'
import grey from '@material-ui/core/colors/grey'
import { Star, StarBorder } from '@material-ui/icons'

const styles = {
  disabled: {
    pointerEvents: 'none'
  }
}

/**
 * Material design star rating component for your star application!
 * @see [Card UI controls](https://material.io/guidelines/components/cards.html#cards-actions)
 */
export default class Rating extends Component {
  constructor (props) {
    super(props)
    this.state = {
      hoverValue: props.value
    }
  }

  renderIcon (i) {
    const filled = i <= this.props.value
    const hovered = i <= this.state.hoverValue

    if (!this.props.disabled && (hovered && !filled || !hovered && filled)) {
      return this.props.iconHoveredRenderer ? this.props.iconHoveredRenderer({
        ...this.props,
        index: i
      }) : this.props.iconHovered
    } else if (filled) {
      return this.props.iconFilledRenderer ? this.props.iconFilledRenderer({
        ...this.props,
        index: i
      }) : this.props.iconFilled
    } else {
      return this.props.iconNormalRenderer ? this.props.iconNormalRenderer({
        ...this.props,
        index: i
      }) : this.props.iconNormal
    }
  }

  render () {
    const rating = []

    for (let i = 1; i <= this.props.max; i++) {
      const tooltip = this.props.tooltip || this.props.tooltipRenderer ? this.props.tooltipRenderer({index: i, ...this.props}) : null

      rating.push(
        <IconButton
          key={i}
          className={this.props.className}
          disabled={this.props.disabled}
          iconStyle={this.props.itemIconStyle}
          iconClassName={this.props.iconClassName}
          style={this.props.itemStyle}
          tooltip={tooltip}
          tooltipPosition={this.props.tooltipPosition}
          tooltipStyles={this.props.tooltipStyles}
          onMouseEnter={() => this.setState({hoverValue: i})}
          onMouseLeave={() => this.setState({hoverValue: this.props.value})}
          onClick={() => {
            if (!this.props.readOnly && this.props.onChange) {
              this.props.onChange(i)
            }
          }}
        >
          {this.renderIcon(i)}
        </IconButton>
      )
    }

    return (
      <div
        style={this.props.disabled || this.props.readOnly ? {...styles.disabled, ...this.props.style} : this.props.style}
      >
        {rating}
      </div>
    )
  }
}

Rating.defaultProps = {
  disabled: false,
  iconFilled: <Star color={orange[500]} />,
  iconHovered: <StarBorder color={orange[500]} />,
  iconNormal: <StarBorder color={grey[300]} />,
  tooltipPosition: 'bottom-center',
  max: 5,
  min: 0,
  readOnly: false,
  value: 0
}

Rating.propTypes = {
  /** Sets classname for IconButton component. */
  className: PropTypes.string,
  /** Disables the rating and gray it out if set to true. */
  disabled: PropTypes.bool,
  /** Sets classname for icon in IconButton Component. */
  iconClassName: PropTypes.string,
  /** This is the icon to be used as an icon in value range. */
  iconFilled: PropTypes.node,
  /** Overrides filled icon renderer. */
  iconFilledRenderer: PropTypes.func,
  /** Overrides hovered icon renderer. */
  iconHoveredRenderer: PropTypes.func,
  /** This is the icon to be used as an hovered icon. */
  iconHovered: PropTypes.node,
  /** This is the icon to be used as an normal icon. */
  iconNormal: PropTypes.node,
  /** Overrides normal icon renderer. */
  iconNormalRenderer: PropTypes.func,
  /** Override the inline-icon-styles of the item elements. */
  itemIconStyle: PropTypes.object,
  /** Override the inline-styles of the item elements. */
  itemStyle: PropTypes.object,
  /** The max value of the rating bar. */
  max: PropTypes.number,
  /** The min value of the rating bar  */
  min: PropTypes.number,
  /** Fired when a value is clicked. */
  onChange: PropTypes.func,
  /** Don't allow input if set to true. */
  readOnly: PropTypes.bool,
  /** Override the inline-styles of the root element. */
  style: PropTypes.object,
  /** Sets tooltip for icon in IconButton Component. */
  tooltip: PropTypes.node,
  /** Overrides tooltip renderer. */
  tooltipRenderer: PropTypes.func,
  /** Overrides tooltip position. */
  tooltipPosition: PropTypes.string,
  /** Overrides tooltip styles. */
  tooltipStyles: PropTypes.object,
  /** The value of the rating bar. */
  value: PropTypes.number
}