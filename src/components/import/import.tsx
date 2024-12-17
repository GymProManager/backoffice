import { useState } from 'react';
import './import.scss';
import { X } from 'lucide-react';
import Papa from 'papaparse';
import { Button } from '../ui/button';
import { ExerciseUseCases } from '@/core/UseCases/ExerciseUseCases';
import { ApiExerciseRepository } from '@/infrastructure/repositories/ApiExerciseRepository';
import { Exercise } from '@/core/entities/Exercise';

const Modal = () => {
    const resetInputFile = Math.random();
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState<any>([]);
    const [listData, setListData] = useState<any>([]);

    const toggleModal = () => {
        setIsOpen(!isOpen);
        setListData( [] );
    };

    const handleFileChange = (event:any) => {
        const file = event.target.files[0];
        if (file) {
          Papa.parse(file, {
            header: true,
            dynamicTyping: true,
            complete: async (result:any) => {
              const checkedData = result.data.filter((item:any) => item.row !== null).map((item:any) => { item.status="" ; return item; });
              checkedData[0]["status"]="";
              setListData(checkedData);

              const exerciseUseCases = new ExerciseUseCases(new ApiExerciseRepository());
              checkedData.map( async (item:any) => {
                let newExercise: Exercise = {
                  name: item.name,
                  description: item.description,
                  video: item.video,
                  typeexercise: item.typeexercise,
                  groupmuscle: item.groupmuscle,
                  image: item.image,
                  miniature: item.miniature,
                  cover: item.cover,
                }
                const _exercise: Exercise = await exerciseUseCases.importExercise(newExercise);
                item.status=_exercise;
                return item;
              });
              setListData(checkedData);
            },
          });
        }
      };

      const convertToCSV = (objArray:any[]) => {
        const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
    
        for (let i = 0; i < array.length; i++) {
          let line = '';
          for (let index in array[i]) {
            if (line !== '') line += ';';
    
            line += array[i][index];
          }
          str += line + '\r\n';
        }
        return str;
      };
    
      const downloadCSV = () => {
        let headers: any= [];
        Object.keys(listData[0]).map((key) => (
          headers.push(key as string)
        ));
        const csvData = new Blob([headers.join(';') + '\r\n' + convertToCSV(listData)], { type: 'text/csv;charset=utf-8;' });
        const csvURL = URL.createObjectURL(csvData);
        const link = document.createElement('a');
        link.href = csvURL;
        link.download = `exercides-resultados.csv`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };


    return (
        <div>
            <Button variant="outline" onClick={toggleModal} >Import</Button>
            {isOpen && (
                <div className="modal-overlay modal-import z-10">
                    <div className="modal-container">
                        <div className='modal-header mb-5 border-b-[1px] border-zinc-200 p-4'>
                            <h2 className="text-xl font-bold text-left">Importar</h2>
                            <span className="close-button" onClick={toggleModal}> <X className='text-3xl text-zinc-500 rounded-full bg-white  hover:bg-zinc-100' /></span>                            
                        </div>  
                        <div className="modal-content">                        
                          <input 
                            type="file" 
                            accept=".csv" 
                            key={resetInputFile}
                            onChange={handleFileChange} 
                            style={{ marginBottom: '20px' }} 
                          />           
                            <div className='w-full overflow-x-auto'>
                                  <table className="table tables-auto w-full table-striped mb-2">
                                  <thead>
                                      <tr className='flex flex-nowrap'>
                                        {listData.length > 0 && Object.keys(listData[0]).map((key) => (
                                          <th key={key} style={{ border: '1px solid #ddd', padding: '8px' }}>{key}</th>
                                        ))}
                                      </tr>
                                    </thead>
                                <tbody>
                                  {listData.map((row:any, index:number) => (
                                    <tr key={index} >
                                      {Object.values(row).map((value:any, i:number) => (
                                        <td className={"filterable-cell disable-scrollbars"} key={i} style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
                                      ))}
                                    </tr>
                                  ))}
                                </tbody>
                                  </table>
                                 
                            </div>   
                            <div className='w-full text-right mt-5'>
                                <Button onClick={downloadCSV} disabled={data.length === 0 }>Resultados CSV</Button>
                              </div>
                      </div>                                            
                    </div>                                              
                </div>
            )}
        </div>
    );
};

export default Modal;
