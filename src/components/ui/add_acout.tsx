// add acount prompt dialog with two buttons, one for cancel and go to login page and one for add account
import { Dialog, DialogTitle, DialogContent  } from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Link } from "react-router-dom";


const AddAccount = ({ open, handleClose }) => {
 

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogTitle>Add Account</DialogTitle>

                <p className="text-center">To continue, please add an account or login to an existing account.</p>
                
                <div className="w-full flex justify-evenly items-center">
                    <Button onClick={handleClose} variant="outline">Cancel</Button>
                    <Link to="/auth">
                    <Button>Add Account</Button>
                    </Link>
                    
                </div>

            </DialogContent>
        </Dialog>
    )



}

export default AddAccount;