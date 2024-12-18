import { useState } from 'react';
import './player.scss';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

const ModalPlayer = ({showModal }:{showModal : boolean} ) => {
    const [isOpen, setIsOpen] = useState(showModal);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };
    return (
        <div>
            {isOpen && (
                <div className="modal-overlay modal-import z-10">
                    <div className="modal-container">
                        <div className='modal-header mb-5 border-b-[1px] border-zinc-200 p-4'>
                            <h2 className="text-xl font-bold text-left">Video</h2>
                            <span className="close-button" onClick={toggleModal}> <X className='text-3xl text-zinc-500 rounded-full bg-white  hover:bg-zinc-100' /></span>                            
                        </div>  
                        <div className="modal-content">                        
                            <div className='w-full text-right mt-5'>
                                <Button >Resultados CSV</Button>
                            </div>
                      </div>                                            
                    </div>                                              
                </div>
            )}
        </div>
    );
};

export default ModalPlayer;
