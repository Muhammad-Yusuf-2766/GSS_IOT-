import ClientForm from '../Components/Client_components/Client_form'
import { Gate_Ways } from '../DB/Products_data'

const AddClient = () => {
	return (
		<div>
			<ClientForm products={Gate_Ways} />
		</div>
	)
}

export default AddClient
