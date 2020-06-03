var documenterSearchIndex = {"docs":
[{"location":"api/#API/Reference-1","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"For now, here is a dump of all documented functions and types.","category":"page"},{"location":"api/#Index-1","page":"API/Reference","title":"Index","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"","category":"page"},{"location":"api/#API/Reference-2","page":"API/Reference","title":"API/Reference","text":"","category":"section"},{"location":"api/#","page":"API/Reference","title":"API/Reference","text":"Modules = [ADI]","category":"page"},{"location":"api/#ADI.pairet-Tuple{Any,AbstractArray,AbstractArray{T,1} where T}","page":"API/Reference","title":"ADI.pairet","text":"pairet([alg=pca], cube, angles; ncomps, threshold=0, kwargs...)\n\nPerforms the bootstrapping algorithm defined in Pairet et al. 2018.\n\nThis method is an iterative approach to standard ADI reduction which seeks to minimze over-subtracting signal in the low-rank approximation of cube.\n\nncomps can be an integer, which will iterate over 1:ncomps, otherwise it can be any sub-type of AbstractRange{<:Int}. As part of the Pairet algorithm, the low-rank approximation at each iteration will be min-clipped at threshold.        \n\nAny extra keyword arguments will be passed to reduce(::ADIDesign).\n\nAlgorithms\n\nAlthough the original paper explicitly uses PCA, we allow use of any ADI algorithm that is characterized by ncomps. By default, uses pca.\n\npca\nnmf (not yet implemented)\n\nReferences\n\nPairet et al. 2018 \"Reference-less algorithm for circumstellar disks imaging\"\n\n\n\n\n\n","category":"method"},{"location":"api/#ADI.pca-Tuple{AbstractArray,AbstractArray{T,1} where T}","page":"API/Reference","title":"ADI.pca","text":"pca(cube, [ref], angles; ncomps, pratio=1)::PCADesign\n\nDecomposes a cube (or reference) using principal component analysis (PCA) to form the approximate reconstruction of the systematic noise.\n\nThis will create a design matrix (the principal subspace) of the cube (or reference) truncated to either ncomps or until the prinicpal ratio is equal to pratio (whichever is fewer). As ncomps (or pratio) increase, more structure is removed from the cube, thus it is possible to over-subtract signal when choosing the size of the principal subpspace.\n\n\n\n\n\n","category":"method"},{"location":"api/#ADI.reconstruct-Union{Tuple{T}, Tuple{ADI.ADIDesign,AbstractArray{T,3}}} where T","page":"API/Reference","title":"ADI.reconstruct","text":"reconstruct(::ADIDesign, cube) -> cube\nreconstruct(::ADIDesign, matrix) -> matrix\n\nReconstrucst an approximation of the input using the design.\n\nSee Also\n\nreduce\n\n\n\n\n\n","category":"method"},{"location":"api/#ADI.PCADesign","page":"API/Reference","title":"ADI.PCADesign","text":"PCADesign(A, w, reconstructed, S, angles, pratio)\n\nA container for PCA-based ADI algorithm output.\n\nA is the principal subspace, w are the weights used to reconstruct to the target cube. The residual from reconstruction is stored in S as a cube. The parallactic-angles are stored in angles. Finally, the principal ratio (the ratio of explained variance per component to the total explained variance) is stored in pratio. \n\nSee Alse\n\npca, pairet\n\n\n\n\n\n","category":"type"},{"location":"api/#Base.reduce-Union{Tuple{T}, Tuple{ADI.ADIDesign,AbstractArray{T,3}}, Tuple{ADI.ADIDesign,AbstractArray{T,3},AbstractArray{T,1} where T}} where T","page":"API/Reference","title":"Base.reduce","text":"reduce(::ADIDesign; method=:deweight, fill=0) -> matrix\nreduce(::ADIDesign, cube, [angles]; method=:deweight, fill=0) -> matrix\n\nReduces an ADI Design matrix by computing the residual of the reconstructed cube and the target cube, then collapsing it. The keyword arguments will be passed to HCIToolbox.collapse!. \n\nIf cube and angles are provided, referential differential imaging (RDI) will be done by reconstructing cube using the input design. If angles are not provided, the same angles used for the design construction will be used.\n\nSee Also\n\nreconstruct\n\n\n\n\n\n","category":"method"},{"location":"#","page":"Home","title":"Home","text":"CurrentModule = ADI","category":"page"},{"location":"#ADI.jl-1","page":"Home","title":"ADI.jl","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"(Image: GitHub) (Image: Build Status) (Image: Coverage) (Image: License)","category":"page"},{"location":"#","page":"Home","title":"Home","text":"A package for angular differential imaging (ADI) along with its variants, such as reference differential imaging (RDI) and spectral differential imaging (SDI).","category":"page"},{"location":"#Installation-1","page":"Home","title":"Installation","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"From Julia enter Pkg mode","category":"page"},{"location":"#","page":"Home","title":"Home","text":"julia>]\n\n(1.3) pkg> add https://github.com/juliahci/ADI.jl","category":"page"},{"location":"#License-1","page":"Home","title":"License","text":"","category":"section"},{"location":"#","page":"Home","title":"Home","text":"This work is distributed under the MIT \"expat\" license. See LICENSE for more information.","category":"page"}]
}
