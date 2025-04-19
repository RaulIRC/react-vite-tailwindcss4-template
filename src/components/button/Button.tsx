import { Button, ButtonGroup } from "@heroui/button";


const ButtonComponent = ({buttonText}: {buttonText?: string}) => {
  return (
    <Button color="primary">{buttonText}</Button>
  )
}

export default ButtonComponent