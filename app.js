const  fs = require('node:fs/promises');
const path = require('node:path');

const func = async () => {
    const filesArr = ['file1.txt', 'file2.txt', 'file3.txt', 'file4.txt', 'file5.txt'];
    const folderArr = ['folder1', 'folder2', 'folder3', 'folder4', 'folder5'];

    const basePath = path.join(process.cwd(), 'mainFolder');

    /*await Promise.all( folderArr.map(async (name)=>{
        await fs.mkdir(path.join(basePath, name), {recursive:true})
    }))

    await Promise.all( filesArr.map(async (name)=>{
        await fs.writeFile(path.join(basePath, name), 'hi there')
    }))*/

    const arr = await fs.readdir(basePath);
    for(const item of arr){
        const stat = await fs.stat(path.join(basePath, item))
        if (stat.isFile()){
            console.log(`file: ${await fs.readFile(item)}`)
        } else console.log(`folder: ${await fs.readFile(item)}`)
    }
}

func().then()